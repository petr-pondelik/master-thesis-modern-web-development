import { gql, useMutation } from '@apollo/client';

const DELETE_READING_LIST_MUTATION = gql`
  mutation DeleteReadingList($id: Int!) {
    deleteReadingList(id: $id) {
      id
    }
  }
`;

type DeleteReadingListData = {
  deleteStory: {
    id: number;
  };
};

type DeleteReadingListVars = {
  id: number;
};

export function useDeleteReadingListMutation(_variables: DeleteReadingListVars, onCompleted?: any) {
  return useMutation<DeleteReadingListData, DeleteReadingListVars>(DELETE_READING_LIST_MUTATION, {
    variables: _variables,
    onCompleted: onCompleted,
  });
}
