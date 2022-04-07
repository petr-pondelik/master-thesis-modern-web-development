import { ErrorPlaceholder, PageContainer } from '../../common';
import { Typography } from '@mui/material';
import { useJwtStore } from '../../store';
import { ReadingListCollection } from '../components/ReadingListCollection';
import { useParams } from 'react-router-dom';
import { useUserReadingListsQuery } from '../../graphql/queries';

export const ReadingListCollectionPage = () => {
  const params = useParams();
  const user = useJwtStore((state) => state.user);
  if (!user) {
    return null;
  }
  let userId;
  if (params.id) {
    userId = parseInt(params.id);
  } else {
    return <ErrorPlaceholder />;
  }
  const { data, loading, error } = useUserReadingListsQuery({ id: userId });
  if (error) {
    return <ErrorPlaceholder />;
  }
  return (
    <PageContainer>
      <Typography variant={'h4'}>My Reading Lists</Typography>
      <ReadingListCollection readingLists={data?.user.readingLists} userId={userId} isLoading={loading} />
    </PageContainer>
  );
};
