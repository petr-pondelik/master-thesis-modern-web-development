import { List } from '@mui/material';
import EntityListItem from './item/EntityListItem';
import { Shell_EntityList } from './Shell_EntityList';

export function EntityList(props: {
  items: Array<any> | undefined;
  itemPath: string;
  isLoading: boolean;
  showHeader?: boolean;
  refetch?: any;
}) {
  const { items, itemPath, isLoading, showHeader, refetch } = props;

  if (isLoading) {
    return <Shell_EntityList showHeader={showHeader} />;
  }

  if (items) {
    const rows = items.map((item, _key) => {
      const _path = `${itemPath}/${item.id ?? item.title}`;
      return (
        <EntityListItem entity={item} path={_path} showHeader={showHeader ?? true} key={_key} refetch={refetch} />
      );
    });

    return <List sx={{ width: '100%', bgcolor: 'background.paper' }}>{rows}</List>;
  }

  return null;
}

export default EntityList;
