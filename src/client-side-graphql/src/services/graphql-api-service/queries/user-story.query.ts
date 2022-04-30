import { gql, useQuery } from '@apollo/client';

const USER_STORY_QUERY = gql`
  query UserStory($id: Int!, $storyId: Int!) {
    user(id: $id) {
      id
      story(id: $storyId) {
        id
        createdAt
        title
        description
        content
        author {
          id
          givenName
          familyName
        }
      }
    }
  }
`;

export type UserStoryQueryAuthor = {
  id: number;
  givenName?: string | null;
  familyName?: string | null;
}

export type UserStoryQueryStory = {
  id: number;
  createdAt: string;
  title: string;
  description?: string | null;
  content: string;
  author: UserStoryQueryAuthor
}

export type UserStoryData = {
  user: {
    story: UserStoryQueryStory;
  };
}

export type UserStoryVars = {
  id: number;
  storyId: number;
}

export function useUserStoryQuery(_variables: UserStoryVars) {
  return useQuery<UserStoryData, UserStoryVars>(USER_STORY_QUERY, {
    variables: _variables,
  });
}
