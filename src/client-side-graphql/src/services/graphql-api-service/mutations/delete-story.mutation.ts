import { gql, useMutation } from '@apollo/client';

const DELETE_STORY_MUTATION = gql`
  mutation DeleteStory($id: Int!) {
    deleteStory(id: $id) {
      id
    }
  }
`;

type DeleteStoryData = {
  deleteStory: {
    id: number;
  };
};

type DeleteStoryVars = {
  id: number;
};

export function useDeleteStoryMutation(_variables: DeleteStoryVars, onCompleted?: any) {
  return useMutation<DeleteStoryData, DeleteStoryVars>(DELETE_STORY_MUTATION, {
    variables: _variables,
    onCompleted: onCompleted
  });
}
