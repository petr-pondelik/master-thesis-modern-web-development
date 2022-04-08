import { gql, useQuery } from '@apollo/client';

const USER_READING_LISTS_WITH_STORIES_QUERY = gql`
  query UserReadingListsWithStories($id: Int!) {
    user(id: $id) {
      id
      readingLists {
        id
        title
        author {
          id
        }
        stories {
          id
          title
        }
      }
    }
  }
`;

export type UserReadingListsWithStoriesQueryReadingList = {
  id: number;
  title: string;
  author: { id: number };
  stories: { id: number; title: string }[];
};

export type UserReadingListsWithStoriesData = {
  user: {
    id: number;
    readingLists: UserReadingListsWithStoriesQueryReadingList[];
  };
};

type UserReadingListsWithStoriesVars = {
  id: number;
};

export function useUserReadingListsWithStoriesQuery(_variables: UserReadingListsWithStoriesVars) {
  return useQuery<UserReadingListsWithStoriesData, UserReadingListsWithStoriesVars>(
    USER_READING_LISTS_WITH_STORIES_QUERY,
    {
      variables: _variables,
    },
  );
}
