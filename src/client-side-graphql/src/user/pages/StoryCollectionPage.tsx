import { PageContainer } from '../../common';
import { StoryCollection } from '../components';
import { Typography } from '@mui/material';
import { useJwtStore } from '../../store';

export const StoryCollectionPage = () => {
  const user = useJwtStore(state => state.user);
  if (!user) {
    return null;
  }
  return (
    <PageContainer>
      <Typography variant={'h4'}>My Stories</Typography>
      {/*<StoryCollection link={link} />*/}
    </PageContainer>
  );
};
