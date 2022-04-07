import { PageContainer } from '../../common';
import { Typography } from '@mui/material';
import { useJwtStore } from '../../store';
import { ReadingListCollection } from '../components/ReadingListCollection';

export const ReadingListCollectionPage = () => {
  const user = useJwtStore(state => state.user);
  if (!user) {
    return null;
  }
  return <PageContainer>
    <Typography variant={'h4'}>My Reading Lists</Typography>
    <ReadingListCollection/>
  </PageContainer>;
}