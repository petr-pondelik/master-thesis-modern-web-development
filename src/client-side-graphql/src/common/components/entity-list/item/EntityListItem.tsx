import { Card, ListItem, CardContent, Typography, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import EntityListItemHeader from '../header/EntityListItemHeader';

const DetailLinkStyle = {
  textDecoration: 'none',
  color: 'rgba(0, 0, 0, 0.87)',
};

interface IEntityListProps {
  entity: any;
  path: string;
  showHeader?: boolean;
  refetch?: any;
}

export function EntityListItem(props: IEntityListProps) {
  const { entity, path, showHeader, refetch } = props;
  return (
    <ListItem sx={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
      <Card sx={{ minWidth: '100%', maxWidth: '100%' }} variant={'outlined'}>
        {showHeader ? <EntityListItemHeader entity={entity} refetch={refetch} /> : null}
        <CardActionArea>
          <CardContent>
            <Link style={DetailLinkStyle} to={path} state={{ id: entity.id }}>
              <Typography variant={'h6'}>{entity.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {entity.description}
              </Typography>
            </Link>
          </CardContent>
        </CardActionArea>
      </Card>
    </ListItem>
  );
}

export default EntityListItem;
