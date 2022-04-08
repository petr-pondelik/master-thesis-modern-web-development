import { ErrorPlaceholder, PageContainer } from '../../common';
import { StoryView } from '../component';
import { useParams } from 'react-router-dom';
import { useStory } from '../../api/queries';

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
