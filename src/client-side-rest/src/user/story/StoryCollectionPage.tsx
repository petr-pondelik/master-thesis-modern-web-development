import { PageContainer, StoriesList } from '../../common';
import { Typography } from '@mui/material';
import { createLink } from '../../api';

export const StoryCollectionPage = () => {
  return (
    <PageContainer>
      <Typography variant={'h4'}>My Stories</Typography>
      <StoriesList fetchLink={createLink('GET', window.location.pathname, 'stories')} showHeader={false} />
    </PageContainer>
  );
};