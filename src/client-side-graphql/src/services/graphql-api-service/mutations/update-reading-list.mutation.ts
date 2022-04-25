import { gql, useMutation } from '@apollo/client';
import { UpdateReadingListContent } from '../graphql-typings';

const UPDATE_READING_LIST_MUTATION = gql`
  mutation UpdateReadingList($id: Int!, $content: UpdateReadingListContent!) {
    updateReadingList(id: $id, content: $content) {
      id
      title
      author {
        id
      }
    }
  }
`;

export type UpdateReadingListData = {
  updateReadingList: {
    id: number;
    title: string;
    author: {
      id: number
    }
  };
};

type UpdateReadingListVars = {
  id: number;
  content: UpdateReadingListContent;
};

export function useUpdateReadingListMutation(_variables: UpdateReadingListVars, _onCompleted?: any) {
  return useMutation<UpdateReadingListData, UpdateReadingListVars>(UPDATE_READING_LIST_MUTATION, {
    variables: _variables,
    onCompleted: _onCompleted,
  });
}
