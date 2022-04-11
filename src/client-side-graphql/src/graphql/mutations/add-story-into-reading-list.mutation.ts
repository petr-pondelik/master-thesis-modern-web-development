import { gql, useMutation } from '@apollo/client';

const ADD_STORY_INTO_READING_LIST = gql`
  mutation AddStoryIntoReadingList($readingListId: Int!, $id: Int!) {
    addStoryIntoReadingList(readingListId: $readingListId, storyId: $id) {
      id
      title
    }
  }
`;

type AddStoryIntoReadingListData = {
  createReadingList: {
    id: number;
  };
};

type AddStoryIntoReadingListVars = {
  readingListId: number;
  id: number
};

export function useAddStoryIntoReadingListMutation(_variables: AddStoryIntoReadingListVars, _onCompleted?: any) {
  return useMutation<AddStoryIntoReadingListData, AddStoryIntoReadingListVars>(ADD_STORY_INTO_READING_LIST, {
    variables: _variables,
    onCompleted: _onCompleted
  });
}
