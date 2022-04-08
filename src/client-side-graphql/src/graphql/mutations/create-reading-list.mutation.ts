import { gql, useMutation } from '@apollo/client';
import { CreateReadingListContent } from '../graphql-typings';

const CREATE_READING_LIST_MUTATION = gql`
  mutation CreateReadingList($content: CreateReadingListContent!) {
    createReadingList(content: $content) {
      id
    }
  }
`;

type CreateReadingListData = {
  createReadingList: {
    id: number;
  };
};

type CreateReadingListVars = {
  content: CreateReadingListContent;
};

export function useCreateReadingListMutation(_variables: CreateReadingListVars, _onCompleted?: any) {
  return useMutation<CreateReadingListData, CreateReadingListVars>(CREATE_READING_LIST_MUTATION, {
    variables: _variables,
    onCompleted: _onCompleted
  });
}
