import { List } from '@mui/material';
import EntityListItem from './item/EntityListItem';
import ErrorPlaceholder from '../ErrorPlaceholder';
import { Shell_EntityList } from './Shell_EntityList';
import { ResponseEnvelope } from '../../../api';

export function EntityList<TEntity>(
  props: {
    items: ResponseEnvelope<Array<TEntity>> | undefined,
    isLoading: boolean,
    error: unknown,
    showHeader?: boolean
  }) {

  const { items, isLoading, error, showHeader } = props;

  if (isLoading) {
    return <Shell_EntityList showHeader={showHeader} />;
  }

  if (items) {
    const rows = items.data.map((item, _key) => {
      return <EntityListItem entity={item} showHeader={showHeader ?? true} key={_key} />;
    });

    return <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {rows}
    </List>;
  }

  if (error) {
    return <ErrorPlaceholder />;
  }

  return null;
}

export default EntityList;