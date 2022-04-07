import { ErrorPlaceholder, PageContainer } from '../../common';
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
  let userId, title;
  if (params.userId && params.readingListTitle) {
    userId = parseInt(params.userId);
    title = params.readingListTitle;
  } else {
    return <ErrorPlaceholder />;
  }

  const { data, loading, error, refetch } = useUserReadingListQuery({ userId: userId, title: title });
  if (error) {
    return <ErrorPlaceholder />;
  }

  return <PageContainer>
    <ReadingListView readingList={data?.user.readingList} isLoading={loading} refetch={refetch} />
  </PageContainer>;
};