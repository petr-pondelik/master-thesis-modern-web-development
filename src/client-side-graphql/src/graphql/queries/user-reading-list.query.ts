import { gql, useQuery } from '@apollo/client';
import { ReadingList } from '../graphql-typings';

const USER_READING_LIST_QUERY = gql`
  query UserReadingList($userId: Int!, $title: String!) {
    user(id: $userId) {
      id
      readingList(title: $title) {
        title
        createdAt
        author {
          id
          familyName
          givenName
        }
        stories {
          id
          title
          createdAt
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

interface IUserReadingListData {
  user: {
    readingList: ReadingList;
  };
}

interface IUserReadingListVars {
  userId: number;
  title: string;
}

export function useUserReadingListQuery(_variables: IUserReadingListVars) {
  return useQuery<IUserReadingListData, IUserReadingListVars>(USER_READING_LIST_QUERY, {
    variables: _variables,
  });
}
