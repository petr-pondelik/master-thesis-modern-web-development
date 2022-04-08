import { ErrorPlaceholder, PageContainer } from '../../common';
import { StoryCollection } from '../components';
import { Typography } from '@mui/material';
import { useJwtStore } from '../../store';
import { useParams } from 'react-router-dom';
import { useUserStoriesQuery } from '../../graphql/queries';

export const StoryCollectionPage = () => {
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
