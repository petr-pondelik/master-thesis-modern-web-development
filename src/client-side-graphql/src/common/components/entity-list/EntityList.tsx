import { List } from '@mui/material';
import EntityListItem from './item/EntityListItem';
import { Shell_EntityList } from './Shell_EntityList';

type EntityListProps = {
  items: Array<any> | undefined;
  itemPath: string;
  isLoading: boolean;
  showHeader?: boolean;
};

export function EntityList(props: EntityListProps) {
  const { items, itemPath, isLoading, showHeader } = props;

  if (isLoading) {
    return <Shell_EntityList showHeader={showHeader} />;
  }

  if (items) {
    const rows = items.map((item, _key) => {
      const _path = `${itemPath}/${item.id ?? item.title}`;
      return <EntityListItem entity={item} path={_path} showHeader={showHeader ?? true} key={_key} />;
    });

    return <List sx={{ width: '100%', bgcolor: 'background.paper' }}>{rows}</List>;
  }

  return null;
}

export default EntityList;
