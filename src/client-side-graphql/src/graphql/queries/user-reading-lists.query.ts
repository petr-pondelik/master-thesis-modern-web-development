import { gql, useQuery } from '@apollo/client';
import { ReadingList } from '../graphql-typings';

const USER_READING_LISTS_QUERY = gql`
  query UserReadingLists($id: Int!, $limit: Int) {
    user(id: $id) {
      id
      readingLists(limit: $limit) {
        title
        stories {
          id
          title
        }
      }
    }
  }
`;

interface IUserReadingListsData {
  user: {
    readingLists: ReadingList[];
  };
}

interface IUserReadingListsVars {
  id: number;
  limit?: number;
}

export function useUserReadingListsQuery(_variables: IUserReadingListsVars) {
  return useQuery<IUserReadingListsData, IUserReadingListsVars>(USER_READING_LISTS_QUERY, {
    variables: _variables,
  });
}
