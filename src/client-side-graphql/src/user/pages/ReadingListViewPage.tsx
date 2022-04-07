import { ErrorPlaceholder, PageContainer } from '../../common';
import { ReadingListView } from '../../reading-list/components';

export const ReadingListViewPage = () => {
  // const { data, isLoading, isError, refetch } = useQuery<ReadingListEnvelope>(
  //   resource.href, () => getRequest<ReadingListEnvelope>(resource.href),
  // );

  // if (isError) {
  //   return <ErrorPlaceholder />;
  // }

  return <PageContainer>
    {/*<ReadingListView readingList={data} isLoading={isLoading} refetch={refetch} />*/}
  </PageContainer>;
};