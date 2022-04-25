import { gql, useMutation } from '@apollo/client';
import { CreateStoryContent } from '../graphql-typings';

const CREATE_STORY_MUTATION = gql`
  mutation CreateStory($content: CreateStoryContent!) {
    createStory(content: $content) {
      id
    }
  }
`;

type CreateStoryData = {
  createStory: {
    id: number
  };
};

type CreateStoryVars = {
  content: CreateStoryContent;
};

export function useCreateStoryMutation(_variables: CreateStoryVars, onCompleted?: any) {
  return useMutation<CreateStoryData, CreateStoryVars>(CREATE_STORY_MUTATION, {
    variables: _variables,
    onCompleted: onCompleted
  });
}
