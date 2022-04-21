import { Card, CardContent, Typography } from '@mui/material';
import { useQuery } from 'react-query';
import { Shell_UserStories } from 'features/user';
import { findLink, HttpRequest, StoryCollectionEnvelope, UserEnvelope } from 'services/rest-api-service';
import { EntityList } from 'features/core/entity-list';

export const UserStories = (props: { user: UserEnvelope | undefined, isLoading: boolean }) => {

  const { user, isLoading } = props;

  if (isLoading || !user) {
    return <Shell_UserStories/>
  }

  const fetchLink = findLink(user._links, 'stories');
  const fetchMethod = () => HttpRequest<StoryCollectionEnvelope>(fetchLink.href, fetchLink.method);
  const { data: stories, isLoading: storiesLoading, error } = useQuery<StoryCollectionEnvelope>(
    ['userStories', user.id], fetchMethod,
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