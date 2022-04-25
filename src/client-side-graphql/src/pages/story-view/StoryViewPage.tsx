import { useStoryQuery } from 'services/graphql-api-service';
import { useParams } from 'react-router-dom';
import { ErrorPlaceholder, PageContainer } from 'features/core';
import { StoryView } from 'features/story';

export const StoryViewPage = () => {
  const params = useParams();
  if (!params.id) {
    return <ErrorPlaceholder />;
  }
  const { data, loading, error } = useStoryQuery({ id: parseInt(params.id) })
  if (error) {
    return <ErrorPlaceholder />;
  }
  return <PageContainer>
    <StoryView story={data?.story} isLoading={loading} />
  </PageContainer>;
};
