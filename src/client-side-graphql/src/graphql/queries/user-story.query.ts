import { gql, useQuery } from '@apollo/client';
import { Story } from '../graphql-typings';

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

export interface IUserStoryData {
  user: {
    story: Story;
  };
}

interface IUserStoryVars {
  id: number;
  storyId: number;
}

export function useUserStoryQuery(_variables: IUserStoryVars) {
  return useQuery<IUserStoryData, IUserStoryVars>(USER_STORY_QUERY, {
    variables: _variables,
  });
}
