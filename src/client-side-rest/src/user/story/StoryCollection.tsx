import { Typography } from '@mui/material';
import { StoryList } from '../../common';
import { useQuery } from 'react-query';
import { getRequest, StoryCollectionEnvelope } from '../../api';
import { Fragment } from 'react';

export const StoryCollection = () => {

  const { data: stories, isLoading, error } = useQuery<StoryCollectionEnvelope>(
    ['myStories'], () => getRequest<StoryCollectionEnvelope>(window.location.pathname),
  );

  return <Fragment>
    <Typography variant={'h4'}>My Stories</Typography>
    <StoryList stories={stories} isLoading={isLoading} error={error} showHeader={false} />
  </Fragment>;
};