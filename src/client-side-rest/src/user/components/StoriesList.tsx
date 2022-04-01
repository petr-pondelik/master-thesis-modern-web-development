import { HateoasLink, StoryCollectionEnvelope } from '../../rest-api';
import { useFetch } from '../../hooks';
import { Typography } from '@mui/material';
import { Fragment } from 'react';
import { ErrorPlaceholder, StoryListItem } from '../../common';

type StoriesListProps = {
  fetchLink: HateoasLink | undefined
}

export const StoriesList = (props: StoriesListProps) => {
  if (!props.fetchLink) {
    return null;
  }

  const { response: stories, loading: loading } = useFetch<StoryCollectionEnvelope>(props.fetchLink.href);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (stories) {
    const items = stories.data.map((item, _key) => {
      return <StoryListItem story={item} key={_key} />;
    });

    return <Fragment>
      <Typography variant={'h5'}>
        Stories
      </Typography>
      {items}
    </Fragment>;
  }

  return <ErrorPlaceholder />;
};

export default StoriesList;