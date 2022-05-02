import { StoryCollection } from 'features/user';
import { Typography } from '@mui/material';
import { useUserStore } from 'stores';
import { findLink } from 'services/rest-api-service';
import { PageContainer } from 'features/core/page-container';

export const UserStoryCollectionPage = () => {
  const user = useUserStore(state => state.user);
  if (!user) {
    return null;
  }
  const link = findLink(user._links, 'stories');
  return (
    <PageContainer>
      <Typography variant={'h4'}>My Stories</Typography>
      <StoryCollection link={link} />
    </PageContainer>
  );
};
