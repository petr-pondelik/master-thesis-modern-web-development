import { CardContent, Grid, Typography } from '@mui/material';
import { findLink, StoryEnvelope } from 'services/rest-api-service';
import { AppUser, useUserStore } from 'stores';
import { ReadingListsRelations, Shell_StoryCard, StoryUpdateDialog } from 'features/story';
import { EntityCard, EntityCardHeader } from 'features/core/entity-card';

const AssignToReadingLists = (user: AppUser | null, story: StoryEnvelope) => {
  return user ? <ReadingListsRelations user={user} story={story} /> : null;
};

export const StoryView = (props: { story: StoryEnvelope | undefined, isLoading: boolean }) => {
  const { story, isLoading } = props;
  const user = useUserStore(state => state.user);
  if (isLoading || !story) {
    return <Shell_StoryCard />;
  }
  return <EntityCard>
    <EntityCardHeader
      title={story.title}
      subheader={story.createdAt}
      author={story.author}
      updateNode={<StoryUpdateDialog story={story} />}
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