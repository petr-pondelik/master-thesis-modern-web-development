import { findLink, HttpRequest, StoryCollectionEnvelope, UserEnvelope } from '../../../../api';
import { Card, CardContent, Typography } from '@mui/material';
import { useQuery } from 'react-query';
import { StoryList } from '../../../../common';
import { Shell_UserStories } from './Shell_UserStories';

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
      <StoryList stories={stories} isLoading={storiesLoading} error={error} showHeader={false} />
    </CardContent>
  </Card>;
};