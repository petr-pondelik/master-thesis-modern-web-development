import { findLink, HttpRequest, StoryCollectionEnvelope, StoryEnvelope } from '../../api';
import { CardContent, Typography } from '@mui/material';
import { Shell_StoryCard } from './story-card';
import { EntityCard, EntityCardHeader } from '../../common';
import { StoryUpdateDialog } from './dialogs';


export const StoryView = (props: { story: StoryEnvelope | undefined, isLoading: boolean, refetch: unknown }) => {
  const { story, isLoading, refetch } = props;
  if (isLoading || !story) {
    return <Shell_StoryCard/>
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
      <Typography variant={'h4'} style={{ marginBottom: '2rem' }}>
        {story?.title ?? '...'}
      </Typography>
      <Typography variant={'body1'} style={{ marginBottom: '2rem' }}>
        {story?.description ?? '...'}
      </Typography>
      <Typography variant={'body1'}>
        {story?.content ?? '...'}
      </Typography>
    </CardContent>
  </EntityCard>
};

export default StoryView;