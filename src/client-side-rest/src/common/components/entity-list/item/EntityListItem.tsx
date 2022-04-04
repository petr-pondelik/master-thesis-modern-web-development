import {
  Card,
  ListItem,
  CardContent,
  Typography,
  CardActionArea,
} from '@mui/material';
import { linkHref } from '../../../../api';
import { Link } from 'react-router-dom';
import EntityListItemHeader from '../header/EntityListItemHeader';

const DetailLinkStyle = {
  textDecoration: 'none',
  color: 'rgba(0, 0, 0, 0.87)',
};

export function EntityListItem(props: { entity: any, showHeader?: boolean }) {
  const { entity, showHeader } = props;
  return <ListItem sx={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
    <Card sx={{ minWidth: '100%', maxWidth: '100%' }} variant={'outlined'}>
      {showHeader ? <EntityListItemHeader entity={entity} /> : null}
      <CardActionArea>
        <CardContent>
          <Link style={DetailLinkStyle} to={linkHref(entity._links, 'self')}>
            <Typography variant={'h6'}>{entity.title}</Typography>
            <Typography variant='body2' color='text.secondary'>{entity.description}</Typography>
          </Link>
        </CardContent>
      </CardActionArea>
    </Card>
  </ListItem>;
}

export default EntityListItem;