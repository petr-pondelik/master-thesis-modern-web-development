import { useParams } from 'react-router-dom';
import { useStory } from 'services/rest-api-service';
import { ErrorPlaceholder } from 'features/core/error-placeholder';
import { PageContainer } from 'features/core/page-container';
import { StoryView } from 'features/story';

export const StoryViewPage = () => {
  const id = useParams().id;
  if (!id) {
    return <ErrorPlaceholder />;
  }

  const { data, isLoading, isError } = useStory(parseInt(id));

  if (isError) {
    return <ErrorPlaceholder />;
  }

  return <PageContainer>
    <StoryView story={data} isLoading={isLoading} />
  </PageContainer>;
};
