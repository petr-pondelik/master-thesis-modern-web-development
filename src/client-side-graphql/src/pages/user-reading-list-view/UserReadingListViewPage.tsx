import { useParams } from 'react-router-dom';
import { useUserStore } from 'stores';
import { useUserReadingListQuery } from 'services/graphql-api-service';
import { Paths } from 'helpers';
import { ErrorPlaceholder, PageContainer } from 'features/core';
import { ReadingListCard } from 'features/reading-list';

export const UserReadingListViewPage = () => {
  const params = useParams();
  const user = useUserStore((state) => state.user);
  if (!user) {
    return null;
  }
  let userId, readingListId;
  if (params.userId && params.readingListId) {
    userId = parseInt(params.userId);
    readingListId = parseInt(params.readingListId);
  } else {
    return <ErrorPlaceholder />;
  }

  const { data, loading, error } = useUserReadingListQuery({ userId: userId, readingListId: readingListId });
  if (error) {
    return <ErrorPlaceholder />;
  }

  return (
    <PageContainer>
      <ReadingListCard
        readingList={data?.user.readingList}
        deleteBacklink={Paths.userReadingLists(userId)}
        isLoading={loading}
      />
    </PageContainer>
  );
};
