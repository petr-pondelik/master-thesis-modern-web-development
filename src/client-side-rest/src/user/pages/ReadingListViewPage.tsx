import { ErrorPlaceholder, PageContainer } from '../../common';
import { ReadingListView } from '../../reading-list/components';
import { useParams } from 'react-router-dom';
import { useUserReadingList } from '../../api/queries';

export const ReadingListViewPage = () => {
  const params = useParams();

  let userId, title;
  if (params.userId && params.readingListTitle) {
    userId = parseInt(params.userId);
    title = params.readingListTitle;
  } else {
    return <ErrorPlaceholder />;
  }

  const { data, isLoading, isError } = useUserReadingList(userId, title);

  if (isError) {
    return <ErrorPlaceholder />;
  }

  return (
    <PageContainer>
      <ReadingListView readingList={data} isLoading={isLoading} />
    </PageContainer>
  );
};
