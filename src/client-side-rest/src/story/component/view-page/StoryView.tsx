import { linkHref, StoryEnvelope } from '../../../rest-api';
import { Avatar, Card, CardContent, CardHeader, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import AuthorLink from '../../../common/components/AuthorLink';
import useFetch from '../../../hooks/useFetch';
import { ErrorPlaceholder, formatAuthor } from '../../../common';

export const StoryView = () => {

  const { response: story, loading } = useFetch<StoryEnvelope>(window.location.pathname);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (story) {
    return <Card sx={{ minWidth: '100%', maxWidth: '100%' }} variant={'elevation'} elevation={0}>
      <AuthorLink to={linkHref(story._links, 'author')}>
        <CardHeader
          title={formatAuthor(story.author)}
          subheader={story.createdAt}
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
              R
            </Avatar>
          }
        />
      </AuthorLink>
      <CardContent>
        <Typography variant={'h4'} style={{ marginBottom: '2rem' }}>
          {story.title}
        </Typography>
        <Typography variant={'body1'} style={{ marginBottom: '2rem' }}>
          {story.description}
        </Typography>
        <Typography variant={'body1'}>
          {story.content}
        </Typography>
      </CardContent>
    </Card>;
  }

  return <ErrorPlaceholder/>;
};

export default StoryView;