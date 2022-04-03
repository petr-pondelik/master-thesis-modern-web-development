import { Card, CardContent, Typography } from '@mui/material';
import { Shell_StoryCardHeader } from './header';

export const Shell_StoryCard = () => {
  return <Card sx={{ minWidth: '100%', maxWidth: '100%' }} variant={'elevation'} elevation={0}>
    <Shell_StoryCardHeader/>
    <CardContent>
      <Typography variant={'h4'} style={{ marginBottom: '2rem' }}>
        ...
      </Typography>
      <Typography variant={'body1'} style={{ marginBottom: '2rem' }}>
        ...
      </Typography>
      <Typography variant={'body1'}>
        ...
      </Typography>
    </CardContent>
  </Card>;
}