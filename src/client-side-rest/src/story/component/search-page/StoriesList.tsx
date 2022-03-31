import { FC, ReactElement } from 'react';
import { StoryListItem } from './StoryListItem';
import { List } from '@mui/material';
import { StoryCollectionEnvelope } from '../../../rest-api/envelope';

type StoriesListProps = {
  stories: StoryCollectionEnvelope
}

export const StoriesList: FC<StoriesListProps> = (props): ReactElement => {

  const records = props.stories.data.map((item, _key) => {
    return <StoryListItem story={item} key={_key} />;
  });

  return <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
    {records}
  </List>;
};