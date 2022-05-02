import { useParams } from 'react-router-dom';
import { useUserStoryQuery } from 'services/graphql-api-service';
import { Paths } from 'helpers';
import { useUserStore } from 'stores';
import { ErrorPlaceholder, PageContainer } from 'features/core';
import { StoryView } from 'features/story';

export const UserStoryViewPage = () => {
  const params = useParams();
  const user = useUserStore((state) => state.user);
  if (!user) {
    return null;
  }
  let userId, storyId;
  if (params.userId && params.storyId) {
    userId = parseInt(params.userId);
    storyId = parseInt(params.storyId);
  } else {
    return <ErrorPlaceholder />;
  }

  const { data, loading, error } = useUserStoryQuery({ id: userId, storyId: storyId });
  if (error) {
    return <ErrorPlaceholder />;
  }

  return (
    <PageContainer>
      <StoryView
        story={data?.user.story}
        deleteBacklink={Paths.userStories(userId)}
        isLoading={loading}
        allowUpdate={true}
      />
    </PageContainer>
  );
};
