import { gql, useQuery } from '@apollo/client';

const STORIES_QUERY = gql`
  query Stories($searchString: String!, $limit: Int) {
    stories(searchString: $searchString, limit: $limit) {
      id
      createdAt
      title
      description
      author {
        id
        givenName
        familyName
      }
    }
  }
`;

export type StoriesQueryAuthor = {
  id: number;
  givenName?: string | null;
  familyName?: string | null;
};

export type StoriesQueryStory = {
  id: number;
  createdAt: string;
  title: string;
  description?: string | null;
  author: StoriesQueryAuthor;
};

export type StoriesData = {
  stories: StoriesQueryStory[];
};

type StoriesVars = {
  searchString: string;
  limit?: number;
};

export function useStoriesQuery(_variables: StoriesVars) {
  return useQuery<StoriesData, StoriesVars>(STORIES_QUERY, {
    variables: _variables,
  });
}
