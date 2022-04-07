import { List } from '@mui/material';
import EntityListItem from './item/EntityListItem';
import ErrorPlaceholder from '../ErrorPlaceholder';
import { Shell_EntityList } from './Shell_EntityList';
import { ApolloError } from '@apollo/client';

export function EntityList(props: {
  items: Array<any> | undefined;
  itemPath: string;
  isLoading: boolean;
  error: ApolloError | undefined;
  showHeader?: boolean;
  refetch?: any;
}) {
  const { items, itemPath, isLoading, error, showHeader, refetch } = props;

  if (isLoading) {
    return <Shell_EntityList showHeader={showHeader} />;
  }

  if (items) {
    const rows = items.map((item) => {
      const _path = `${itemPath}/${item.id}`;
      return (
        <EntityListItem entity={item} path={_path} showHeader={showHeader ?? true} key={item.id} refetch={refetch} />
      );
    });

    return <List sx={{ width: '100%', bgcolor: 'background.paper' }}>{rows}</List>;
  }

  if (error) {
    return <ErrorPlaceholder />;
  }

  return null;
}

export default EntityList;
