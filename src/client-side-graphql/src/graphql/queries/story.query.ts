import { gql, useQuery } from '@apollo/client';

const STORY_QUERY = gql`
  query Story($id: Int!) {
    story(id: $id) {
      id
      createdAt
      title
      description
      content
      author {
        id
        familyName
        givenName
      }
    }
  }
`;

export type StoryQueryAuthor = {
  id: number;
  givenName?: string | null;
  familyName?: string | null;
}

export type StoryQueryStory = {
  id: number;
  createdAt: string;
  title: string;
  description?: string | null;
  content: string;
  author: StoryQueryAuthor
}

export type StoryData = {
  story: StoryQueryStory;
}

export type StoryVars = {
  id: number;
}

export function useStoryQuery(_variables: StoryVars) {
  return useQuery<StoryData, StoryVars>(STORY_QUERY, {
    variables: _variables,
  });
}
