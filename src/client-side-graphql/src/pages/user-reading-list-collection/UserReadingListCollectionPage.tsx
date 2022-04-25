import { Typography } from '@mui/material';
import { ErrorPlaceholder, PageContainer } from 'features/core';
import { ReadingListCollection } from 'features/user';
import { useParams } from 'react-router-dom';
import { useUserReadingListsQuery } from 'services/graphql-api-service';
import { useUserStore } from 'store';

export const UserReadingListCollectionPage = () => {
  const params = useParams();
  const user = useUserStore((state) => state.user);
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
