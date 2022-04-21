import { ReadingListCard } from 'features/reading-list';
import { useParams } from 'react-router-dom';
import { useUserReadingList } from 'services/rest-api-service/queries';
import { ErrorPlaceholder } from 'features/core/error-placeholder';
import { PageContainer } from 'features/core/page-container';

export const UserReadingListViewPage = () => {
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
      <ReadingListCard readingList={data} isLoading={isLoading} />
    </PageContainer>
  );
};
