import { ErrorPlaceholder, PageContainer } from '../../common';
import { ReadingListView } from '../../reading-list/components';
import { useQuery } from 'react-query';
import { getRequest, ReadingListEnvelope } from '../../api';
import { useResource } from '../../hooks';

export const ReadingListViewPage = () => {
  const resource = useResource(window.location.pathname);
  const { data, isLoading, isError, refetch } = useQuery<ReadingListEnvelope>(
    resource.href, () => getRequest<ReadingListEnvelope>(resource.href),
  );

  if (isError) {
    return <ErrorPlaceholder />;
  }

  return <PageContainer>
    <ReadingListView readingList={data} isLoading={isLoading} refetch={refetch} />
  </PageContainer>;
};