import { gql, useQuery } from '@apollo/client';
import { Story } from '../graphql-typings';

const QUERY = gql`
  query Story($id: ID!) {
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

interface IStoryData {
  story: Story;
}

interface IStoryVars {
  id: string;
}

export function useStoryQuery(_variables: IStoryVars) {
  return useQuery<IStoryData, IStoryVars>(QUERY, {
    variables: _variables,
  });
}
