import { ErrorPlaceholder, PageContainer, Paths } from '../../common';
import { ReadingListView } from '../../reading-list/components';
import { useParams } from 'react-router-dom';
import { useJwtStore } from '../../store';
import { useUserReadingListQuery } from '../../graphql/queries';

export const ReadingListViewPage = () => {
  const params = useParams();
  const user = useJwtStore((state) => state.user);
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
      <ReadingListView
        readingList={data?.user.readingList}
        deleteBacklink={Paths.userReadingLists(userId)}
        isLoading={loading}
      />
    </PageContainer>
  );
};
