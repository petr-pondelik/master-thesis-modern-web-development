import { PageContainer } from '../../common';
import { StoryCollection } from '../components';
import { Typography } from '@mui/material';
import { useJwtStore } from '../../store';
import { findLink } from '../../api';

export const StoryCollectionPage = () => {
  const user = useJwtStore(state => state.user);
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
