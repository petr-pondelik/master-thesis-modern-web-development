import { gql, useQuery } from '@apollo/client';
import { Story } from '../graphql-typings';

const USER_STORIES_QUERY = gql`
  query UserStories($id: Int!, $limit: Int) {
    user(id: $id) {
      id
      stories(limit: $limit) {
        id
        title
        description
      }
    }
  }
`;

interface IUserStoriesData {
  user: {
    stories: Story[];
  };
}

interface IUserStoriesVars {
  id: number;
  limit?: number;
}

export function useUserStoriesQuery(_variables: IUserStoriesVars) {
  return useQuery<IUserStoriesData, IUserStoriesVars>(USER_STORIES_QUERY, {
    variables: _variables,
  });
}
