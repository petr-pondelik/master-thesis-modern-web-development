import { gql, useQuery } from '@apollo/client';
import { User } from '../graphql-typings';

const USER_WITH_STORIES_QUERY = gql`
  query UserWithStories($id: Int!, $limit: Int) {
    user(id: $id) {
      id
      email
      givenName
      familyName
      stories(limit: $limit) {
        id
        createdAt
        title
        description
      }
    }
  }
`;

interface IUserWithStoriesData {
  user: User;
}

interface IUserWithStoriesVars {
  id: number;
  limit?: number;
}

export function useUserWithStoriesQuery(_variables: IUserWithStoriesVars) {
  return useQuery<IUserWithStoriesData, IUserWithStoriesVars>(USER_WITH_STORIES_QUERY, {
    variables: _variables,
  });
}
