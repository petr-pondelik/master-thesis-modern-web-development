import { gql, useMutation } from '@apollo/client';

const DELETE_READING_LIST_MUTATION = gql`
  mutation DeleteReadingList($title: String!, $userId: Int!) {
    deleteReadingList(title: $title, userId: $userId) {
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
  userId: number;
  title: string;
};

export function useDeleteReadingListMutation(_variables: DeleteReadingListVars, onCompleted?: any) {
  return useMutation<DeleteReadingListData, DeleteReadingListVars>(DELETE_READING_LIST_MUTATION, {
    variables: _variables,
    onCompleted: onCompleted,
  });
}
