import { gql, useQuery } from '@apollo/client';
import { Story } from '../graphql-typings';

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

interface IStoryData {
  story: Story;
}

interface IStoryVars {
  id: number;
}

export function useStoryQuery(_variables: IStoryVars) {
  return useQuery<IStoryData, IStoryVars>(STORY_QUERY, {
    variables: _variables,
  });
}
