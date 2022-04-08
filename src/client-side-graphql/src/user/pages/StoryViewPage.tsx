import { ErrorPlaceholder, PageContainer, Paths } from '../../common';
import StoryView from '../../story/component/StoryView';
import { useParams } from 'react-router-dom';
import { useJwtStore } from '../../store';
import { useUserStoryQuery } from '../../graphql/queries';

export const StoryViewPage = () => {
  const params = useParams();
  const user = useJwtStore((state) => state.user);
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
