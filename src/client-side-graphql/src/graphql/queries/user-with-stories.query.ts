import { gql, useQuery } from '@apollo/client';

const USER_WITH_STORIES_QUERY = gql`
  query UserWithStories($id: Int!, $limit: Int) {
    user(id: $id) {
      id
      profileDescription
      givenName
      familyName
      stories(limit: $limit) {
        id
        title
        description
      }
    }
  }
`;

type UserWithStoriesQueryStory = {
  id: number;
  title: string;
  description?: string | null;
}

export type UserWithStoriesQueryUser = {
  id: number;
  createdAt: string;
  givenName?: string | null;
  familyName?: string | null;
  profileDescription?: string | null;
  stories: UserWithStoriesQueryStory[]
}

export type UserWithStoriesData = {
  user: UserWithStoriesQueryUser;
};

export type UserWithStoriesVars = {
  id: number;
  limit?: number;
};

export function useUserWithStoriesQuery(_variables: UserWithStoriesVars) {
  return useQuery<UserWithStoriesData, UserWithStoriesVars>(USER_WITH_STORIES_QUERY, {
    variables: _variables,
  });
}
