import {
  Card,
  ListItem,
  CardContent,
  Typography,
  CardActionArea,
} from '@mui/material';
import { findLink } from '../../../../api';
import { Link } from 'react-router-dom';
import EntityListItemHeader from '../header/EntityListItemHeader';

const DetailLinkStyle = {
  textDecoration: 'none',
  color: 'rgba(0, 0, 0, 0.87)',
};

export function EntityListItem(props: { entity: any, showHeader?: boolean, refetch?: any }) {
  const { entity, showHeader, refetch } = props;
  const _resourceLink = findLink(entity._links, 'self');
  return <ListItem sx={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
    <Card sx={{ minWidth: '100%', maxWidth: '100%' }} variant={'outlined'}>
      {showHeader ? <EntityListItemHeader entity={entity} refetch={refetch} /> : null}
      <CardActionArea>
        <CardContent>
          <Link style={DetailLinkStyle} to={_resourceLink.href} state={{ resource: _resourceLink }}>
            <Typography variant={'h6'}>{entity.title}</Typography>
            <Typography variant='body2' color='text.secondary'>{entity.description}</Typography>
          </Link>
        </CardContent>
      </CardActionArea>
    </Card>
  </ListItem>;
}

export default EntityListItem;