import { ErrorPlaceholder, PageContainer } from '../../common';
import StoryView from '../../story/component/StoryView';
import { useParams } from 'react-router-dom';
import { useUserStory } from '../../api/queries';

export const StoryViewPage = () => {
  const params = useParams();
  let userId, storyId;
  if (params.userId && params.storyId) {
    userId = parseInt(params.userId);
    storyId = parseInt(params.storyId);
  } else {
    return <ErrorPlaceholder />;
  }

  const { data, isLoading, isError } = useUserStory(userId, storyId);

  if (isError) {
    return <ErrorPlaceholder />;
  }

  return <PageContainer>
    <StoryView story={data} isLoading={isLoading} />
  </PageContainer>;
};