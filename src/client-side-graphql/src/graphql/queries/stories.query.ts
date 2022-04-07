import { gql, useQuery } from '@apollo/client';
import { Story } from '../graphql-typings';

const QUERY = gql`
  query Stories($searchString: String!, $limit: Int) {
    stories(searchString: $searchString, limit: $limit) {
      id
      title
      description
      createdAt
      author {
        id
        givenName
        familyName
      }
    }
  }
`;

interface IStoriesData {
  stories: Story[];
}

interface IStoriesVars {
  searchString: string;
  limit?: number;
}

export function useStoriesQuery(_variables: IStoriesVars) {
  return useQuery<IStoriesData, IStoriesVars>(QUERY, {
    variables: _variables,
  });
}
