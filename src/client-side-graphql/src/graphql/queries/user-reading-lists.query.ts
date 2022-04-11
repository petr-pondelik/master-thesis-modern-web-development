import { gql, useQuery } from '@apollo/client';

const USER_READING_LISTS_QUERY = gql`
  query UserReadingLists($id: Int!, $limit: Int) {
    user(id: $id) {
      id
      readingLists(limit: $limit) {
        id
        title
      }
    }
  }
`;

export type UserReadingListsQueryReadingList = {
  id: number;
  title: string;
};

export type UserReadingListsData = {
  user: {
    id: number;
    readingLists: UserReadingListsQueryReadingList[];
  };
};

type UserReadingListsVars = {
  id: number;
  limit?: number;
};

export function useUserReadingListsQuery(_variables: UserReadingListsVars) {
  return useQuery<UserReadingListsData, UserReadingListsVars>(USER_READING_LISTS_QUERY, {
    variables: _variables,
  });
}
