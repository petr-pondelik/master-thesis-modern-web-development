import { gql, useMutation } from '@apollo/client';
import { Story, UpdateStoryContent } from '../graphql-typings';

const UPDATE_STORY_MUTATION = gql`
  mutation UpdateStory($id: Int!, $content: UpdateStoryContent!) {
    updateStory(id: $id, content: $content) {
      id
    }
  }
`;

type UpdateStoryData = {
  createStory: Partial<Story>;
};

type UpdateStoryVars = {
  id: number,
  content: UpdateStoryContent;
};

export function useUpdateStoryMutation(_variables: UpdateStoryVars, _onCompleted?: any) {
  return useMutation<UpdateStoryData, UpdateStoryVars>(UPDATE_STORY_MUTATION, {
    variables: _variables,
    onCompleted: _onCompleted
  });
}
