import { Card, CardActionArea, CardContent, ListItem, Typography } from '@mui/material';
import Shell_EntityListItemHeader from '../header/Shell_EntityListItemHeader';

export const Shell_EntityListItem = (props: { showHeader?: boolean }) => {
  return <ListItem sx={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
    <Card sx={{ minWidth: '100%', maxWidth: '100%' }} variant={'outlined'}>
      {props.showHeader ? <Shell_EntityListItemHeader/> : null}
      <CardActionArea>
        <CardContent>
          <Typography variant={'h6'}>...</Typography>
          <Typography variant='body2' color='text.secondary'>...</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  </ListItem>;
};

export default Shell_EntityListItem;