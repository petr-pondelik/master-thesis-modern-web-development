import { Card, CardContent, Typography } from '@mui/material';
import { Shell_StoryList } from '../../../../common';

export const Shell_UserStories = () => {
  return <Card elevation={0}>
    <CardContent>
      <Typography variant={'h5'}>
        Stories
      </Typography>
      <Shell_StoryList/>
    </CardContent>
  </Card>;
}