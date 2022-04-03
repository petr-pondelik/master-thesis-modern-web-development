import { List } from '@mui/material';
import { StoryCollectionEnvelope } from '../../../api';
import StoryListItem from './item/StoryListItem';
import ErrorPlaceholder from '../ErrorPlaceholder';
import { Shell_StoryList } from './Shell_StoryList';

type StoryListProps = {
  stories: StoryCollectionEnvelope|undefined,
  isLoading: boolean,
  error: unknown,
  showHeader?: boolean
}

export const StoryList = (props: StoryListProps) => {

  const { stories, isLoading, error, showHeader } = props;

  if (isLoading) {
    return <Shell_StoryList showHeader={showHeader}/>
  }

  if (stories) {
    const items = stories.data.map((item, _key) => {
      return <StoryListItem story={item} showHeader={showHeader ?? true} key={_key} />;
    });

    return <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {items}
    </List>;
  }

  if (error) {
    return <ErrorPlaceholder/>
  }

  return null;
};

export default StoryList;