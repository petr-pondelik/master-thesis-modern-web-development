import { gql, useMutation } from '@apollo/client';

const ADD_STORY_INTO_READING_LIST = gql`
  mutation AddStoryIntoReadingList($title: String!, $userId: Int!, $storyId: Int!) {
    addStoryIntoReadingList(title: $title, userId: $userId, storyId: $storyId) {
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
  title: string,
  userId: number,
  storyId: number
};

export function useAddStoryIntoReadingListMutation(_variables: AddStoryIntoReadingListVars, _onCompleted?: any) {
  return useMutation<AddStoryIntoReadingListData, AddStoryIntoReadingListVars>(ADD_STORY_INTO_READING_LIST, {
    variables: _variables,
    onCompleted: _onCompleted
  });
}
