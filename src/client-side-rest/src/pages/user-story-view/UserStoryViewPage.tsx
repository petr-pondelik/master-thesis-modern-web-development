import StoryView from 'features/story/story-view/StoryView';
import { useParams } from 'react-router-dom';
import { useUserStory } from 'services/rest-api-service/queries';
import { ErrorPlaceholder } from 'features/core/error-placeholder';
import { PageContainer } from 'features/core/page-container';

export const UserStoryViewPage = () => {
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