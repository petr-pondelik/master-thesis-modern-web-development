import { Card, CardContent, Typography } from '@mui/material';
import { StoryEnvelope } from '../../../../api';
import { StoryCardHeader } from './header';
import { Shell_StoryCard } from './Shell_StoryCard';

export const StoryCard = (props: { story: StoryEnvelope|undefined, isLoading: boolean, refetch: any }) => {

  const {story, isLoading, refetch} = props;

  if (isLoading || !story) {
    return <Shell_StoryCard/>
  }

  return <Card sx={{ minWidth: '100%', maxWidth: '100%' }} variant={'elevation'} elevation={0}>
    <StoryCardHeader story={story} isLoading={isLoading} refetch={refetch} />
    <CardContent>
      <Typography variant={'h4'} style={{ marginBottom: '2rem' }}>
        {story?.title}
      </Typography>
      <Typography variant={'body1'} style={{ marginBottom: '2rem' }}>
        {story?.description}
      </Typography>
      <Typography variant={'body1'}>
        {story?.content}
      </Typography>
    </CardContent>
  </Card>;

};