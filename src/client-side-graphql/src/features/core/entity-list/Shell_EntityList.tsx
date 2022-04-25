import { List } from '@mui/material';
import { Shell_EntityListItem } from './item/Shell_EntityListItem';

export const Shell_EntityList = (props: { showHeader?: boolean }) => {

  const showHeader = props.showHeader;

  const data = [[],[],[], []];

  const items = data.map((item, _key) => {
    return <Shell_EntityListItem showHeader={showHeader} key={_key}/>;
  });

  return <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
    {items}
  </List>;
}

export default Shell_EntityList;