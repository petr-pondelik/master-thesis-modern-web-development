import { List } from '@mui/material';
import { ResponseEnvelope } from 'services/rest-api-service';
import Shell_EntityList from 'features/core/entity-list/Shell_EntityList';
import { EntityListItem } from 'features/core/entity-list/item';
import { ErrorPlaceholder } from 'features/core/error-placeholder';

export function EntityList(
  props: {
    items: ResponseEnvelope<Array<any>> | undefined,
    isLoading: boolean,
    error: unknown,
    showHeader?: boolean,
    refetch?: any
  }) {

  const { items, isLoading, error, showHeader, refetch } = props;

  if (isLoading) {
    return <Shell_EntityList showHeader={showHeader} />;
  }

  if (items) {
    const rows = items.data.map((item, _key) => {
      return <EntityListItem entity={item} showHeader={showHeader ?? true} key={_key} refetch={refetch} />;
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