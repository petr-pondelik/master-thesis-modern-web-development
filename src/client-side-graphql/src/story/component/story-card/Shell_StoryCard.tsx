import { Card, CardContent, Typography } from '@mui/material';
import { Shell_EntityCardHeader } from '../../../common';

export const Shell_StoryCard = () => {
  return <Card sx={{ minWidth: '100%', maxWidth: '100%' }} variant={'elevation'} elevation={0}>
    <Shell_EntityCardHeader/>
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