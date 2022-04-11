import { ErrorPlaceholder, PageContainer } from '../../common';
import { ReadingListView } from '../../reading-list/components';
import { useParams } from 'react-router-dom';
import { useUserReadingList } from '../../api/queries';

export const ReadingListViewPage = () => {
  const params = useParams();

  let userId, readingListId;
  if (params.userId && params.readingListId) {
    userId = parseInt(params.userId);
    readingListId = parseInt(params.readingListId);
  } else {
    return <ErrorPlaceholder />;
  }

  const { data, isLoading, isError } = useUserReadingList(userId, readingListId);

  if (isError) {
    return <ErrorPlaceholder />;
  }

  return (
    <PageContainer>
      <ReadingListView readingList={data} isLoading={isLoading} />
    </PageContainer>
  );
};
