import { findLink, JwtPayload, StoryEnvelope } from '../../api';
import { CardContent, Grid, Typography } from '@mui/material';
import { Shell_StoryCard } from './story-card';
import { EntityCard, EntityCardHeader } from '../../common';
import { ReadingListsRelations, StoryUpdateDialog } from './dialogs';
import { useJwtStore } from '../../store';

const AssignToReadingLists = (user: JwtPayload | null, story: StoryEnvelope) => {
  return user ? <ReadingListsRelations user={user} story={story} /> : null;
};

export const StoryView = (props: { story: StoryEnvelope | undefined, isLoading: boolean, refetch: unknown }) => {
  const { story, isLoading, refetch } = props;
  const user = useJwtStore(state => state.user);
  if (isLoading || !story) {
    return <Shell_StoryCard />;
  }
  return <EntityCard>
    <EntityCardHeader
      title={story.title}
      subheader={story.createdAt}
      author={story.author}
      updateNode={<StoryUpdateDialog story={story} refetch={refetch} />}
      deleteLink={findLink(story._links, 'delete')}
      updateLink={findLink(story._links, 'update')}
      parentLink={findLink(story._links, 'parent')}
      authorLink={findLink(story._links, 'author')}
    />
    <CardContent>
      <Grid container style={{ marginBottom: '2rem' }}>
        <Grid item xs={12}>
          <Typography variant={'h4'} sx={{ marginBottom: '1rem' }}>
            {story?.title ?? '...'}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {AssignToReadingLists(user, story)}
        </Grid>
      </Grid>
      <Typography variant={'body1'} style={{ marginBottom: '2rem' }}>
        {story?.description ?? '...'}
      </Typography>
      <Typography variant={'body1'}>
        {story?.content ?? '...'}
      </Typography>
    </CardContent>
  </EntityCard>;
};

export default StoryView;