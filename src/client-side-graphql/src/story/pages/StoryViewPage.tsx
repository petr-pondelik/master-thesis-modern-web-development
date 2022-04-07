import { ErrorPlaceholder, PageContainer } from '../../common';
import { StoryView } from '../component';
import { useStoryQuery } from '../../graphql/queries';
import { useParams } from 'react-router-dom';

export const StoryViewPage = () => {
  const params = useParams();
  console.log(params);
  if (!params.id) {
    return <ErrorPlaceholder />;
  }
  const { data, loading, error, refetch } = useStoryQuery({ id: params.id })
  if (error) {
    return <ErrorPlaceholder />;
  }
  return <PageContainer>
    <StoryView story={data?.story} isLoading={loading} refetch={refetch} />
  </PageContainer>;
};
