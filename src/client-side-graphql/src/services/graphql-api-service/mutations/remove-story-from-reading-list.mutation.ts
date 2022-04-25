import { gql, useMutation } from '@apollo/client';

const REMOVE_STORY_FROM_READING_LIST = gql`
  mutation RemoveStoryFromReadingList($readingListId: Int!, $id: Int!) {
    removeStoryFromReadingList(readingListId: $readingListId, storyId: $id) {
      id
      title
    }
  }
`;

type RemoveStoryFromReadingListData = {
  createReadingList: {
    id: number;
  };
};

type RemoveStoryFromReadingListVars = {
  readingListId: number;
  id: number;
};

export function useRemoveStoryFromReadingListMutation(_variables: RemoveStoryFromReadingListVars, _onCompleted?: any) {
  return useMutation<RemoveStoryFromReadingListData, RemoveStoryFromReadingListVars>(REMOVE_STORY_FROM_READING_LIST, {
    variables: _variables,
    onCompleted: _onCompleted,
  });
}
