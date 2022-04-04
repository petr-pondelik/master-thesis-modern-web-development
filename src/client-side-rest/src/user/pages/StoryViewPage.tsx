import { ErrorPlaceholder, PageContainer } from '../../common';
import StoryView from '../../story/component/StoryView';
import { useQuery } from 'react-query';
import { getRequest, StoryEnvelope } from '../../api';

export const StoryViewPage = () => {
  const { data, isLoading, isError, refetch } = useQuery<StoryEnvelope>(
    window.location.pathname, () => getRequest<StoryEnvelope>(window.location.pathname),
  );

  if (isError) {
    return <ErrorPlaceholder />;
  }

  return <PageContainer>
    <StoryView story={data} isLoading={isLoading} refetch={refetch} />
  </PageContainer>;
};