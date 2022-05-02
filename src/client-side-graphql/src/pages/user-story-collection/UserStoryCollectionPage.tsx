import { Typography } from '@mui/material';
import { ErrorPlaceholder, PageContainer } from 'features/core';
import { StoryCollection } from 'features/user';
import { useParams } from 'react-router-dom';
import { useUserStoriesQuery } from 'services/graphql-api-service';
import { useUserStore } from 'stores';

export const UserStoryCollectionPage = () => {
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
  const { data, loading, error } = useUserStoriesQuery({ id: userId });
  if (error) {
    return <ErrorPlaceholder />;
  }
  return (
    <PageContainer>
      <Typography variant={'h4'}>My Stories</Typography>
      <StoryCollection stories={data?.user.stories} userId={userId} isLoading={loading} />
    </PageContainer>
  );
};
