import { List } from '@mui/material';
import { Shell_StoryListItem } from './item/Shell_StoryListItem';

export const Shell_StoryList = (props: { showHeader?: boolean }) => {

  const showHeader = props.showHeader;

  const data = [[],[],[], []];

  const items = data.map((item, _key) => {
    return <Shell_StoryListItem showHeader={showHeader} key={_key}/>;
  });

  return <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
    {items}
  </List>;
}

export default Shell_StoryList;