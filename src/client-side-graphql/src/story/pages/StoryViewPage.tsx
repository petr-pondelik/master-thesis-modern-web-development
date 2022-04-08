import { ErrorPlaceholder, PageContainer } from '../../common';
import { StoryView } from '../component';
import { useStoryQuery } from '../../graphql/queries';
import { useParams } from 'react-router-dom';

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
