import { gql, useQuery } from '@apollo/client';

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

export type UserStoriesQueryStory = {
  id: number;
  createdAt: string;
  title: string;
  description?: string | null;
}

export type UserStoriesData = {
  user: {
    id: number,
    stories: UserStoriesQueryStory[];
  };
}

export type UserStoriesVars = {
  id: number;
  limit?: number;
}

export function useUserStoriesQuery(_variables: UserStoriesVars) {
  return useQuery<UserStoriesData, UserStoriesVars>(USER_STORIES_QUERY, {
    variables: _variables,
  });
}
