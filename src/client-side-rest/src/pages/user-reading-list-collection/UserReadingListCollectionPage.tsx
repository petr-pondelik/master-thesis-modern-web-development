import { Typography } from '@mui/material';
import { ReadingListCollection } from 'features/user/reading-list-collection/ReadingListCollection';
import { findLink } from 'services/rest-api-service';
import { useUserStore } from 'stores';
import { PageContainer } from 'features/core/page-container';

export const UserReadingListCollectionPage = () => {
  const user = useUserStore(state => state.user);
  if (!user) {
    return null;
  }
  const link = findLink(user._links, 'reading-lists');
  return <PageContainer>
    <Typography variant={'h4'}>My Reading Lists</Typography>
    <ReadingListCollection link={link}/>
  </PageContainer>;
}