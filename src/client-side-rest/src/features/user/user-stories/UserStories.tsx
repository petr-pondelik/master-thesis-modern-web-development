import { Card, CardContent, Typography } from '@mui/material';
import { Shell_UserStories } from 'features/user';
import { findLink, StoryCollectionEnvelope, UserEnvelope } from 'services/rest-api-service';
import { EntityList } from 'features/core/entity-list';
import { useLinkQuery } from 'services/rest-api-service/queries';

export const UserStories = (props: { user: UserEnvelope | undefined, isLoading: boolean }) => {
  const { user, isLoading } = props;

  if (isLoading || !user) {
    return <Shell_UserStories/>
  }

  const fetchLink = findLink(user._links, 'stories');
  const { data: stories, isLoading: storiesLoading, error } = useLinkQuery<StoryCollectionEnvelope>(
    ['userStories', user.id], fetchLink,
  );

  return <Card elevation={0}>
    <CardContent>
      <Typography variant={'h5'}>
        Stories
      </Typography>
      <EntityList items={stories} isLoading={storiesLoading} error={error} showHeader={false} />
    </CardContent>
  </Card>;
};