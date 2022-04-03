import { Typography } from '@mui/material';
import { FloatingAddButton, StoryList } from '../../common';
import { useQuery } from 'react-query';
import { findLink, getRequest, StoryCollectionEnvelope } from '../../api';
import { Fragment } from 'react';
import { StoryCreateDialog } from '../../story/component/dialogs/StoryCreateDialog';

export const StoryCollection = () => {

  const { data: stories, isLoading, error, refetch } = useQuery<StoryCollectionEnvelope>(
    ['myStories'], () => getRequest<StoryCollectionEnvelope>(window.location.pathname),
  );

  return <Fragment>
    <Typography variant={'h4'}>My Stories</Typography>
    <StoryList stories={stories} isLoading={isLoading} error={error} showHeader={false} />
    <StoryCreateDialog createLink={findLink(stories?._links ?? [], 'create')} refetch={refetch}/>
  </Fragment>;
};