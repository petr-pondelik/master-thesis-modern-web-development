import { ErrorPlaceholder, PageContainer } from '../../common';
import { ReadingListView } from '../../reading-list/components';
import { useQuery } from 'react-query';
import { getRequest, ReadingListEnvelope } from '../../api';

export const ReadingListViewPage = () => {
  const { data, isLoading, isError, refetch } = useQuery<ReadingListEnvelope>(
    window.location.pathname, () => getRequest<ReadingListEnvelope>(window.location.pathname),
  );

  if (isError) {
    return <ErrorPlaceholder />;
  }

  return <PageContainer>
    <ReadingListView readingList={data} isLoading={isLoading} refetch={refetch} />
  </PageContainer>;
};