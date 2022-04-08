import { gql, useQuery } from '@apollo/client';

const USER_READING_LIST_QUERY = gql`
  query UserReadingList($userId: Int!, $title: String!) {
    user(id: $userId) {
      id
      readingList(title: $title) {
        createdAt
        title
        author {
          id
          familyName
          givenName
        }
        stories {
          id
          createdAt
          title
          description
          author {
            id
            givenName
            familyName
          }
        }
      }
    }
  }
`;

export type UserReadingListQueryAuthor = {
  id: number;
  givenName?: string | null;
  familyName?: string | null;
};

export type UserReadingListQueryStory = {
  id: number;
  createdAt: string;
  title: string;
  description?: string | null;
  author: UserReadingListQueryAuthor;
};

export type UserReadingListQueryReadingList = {
  createdAt: string;
  title: string;
  author: UserReadingListQueryAuthor;
  stories: UserReadingListQueryStory[];
};

export type UserReadingListData = {
  user: {
    id: number;
    readingList: UserReadingListQueryReadingList;
  };
};

export type UserReadingListVars = {
  userId: number;
  title: string;
};

export function useUserReadingListQuery(_variables: UserReadingListVars) {
  return useQuery<UserReadingListData, UserReadingListVars>(USER_READING_LIST_QUERY, {
    variables: _variables,
  });
}
