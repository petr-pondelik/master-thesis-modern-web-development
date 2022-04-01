import { FC, ReactElement } from 'react';
import { List } from '@mui/material';
import { StoryCollectionEnvelope } from '../../../rest-api';
import { StoryListItem } from '../../../common';

type StoriesListProps = {
  stories: StoryCollectionEnvelope
}

export const StoriesList: FC<StoriesListProps> = (props): ReactElement => {

  const records = props.stories.data.map((item, _key) => {
    return <StoryListItem story={item} showHeader={true} key={_key} />;
  });

  return <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
    {records}
  </List>;
};

export default StoriesList;