import {
  Card,
  ListItem,
  CardContent,
  Typography,
  CardActionArea,
} from '@mui/material';
import { linkHref, StoryEnvelope } from '../../../rest-api';
import { Link } from 'react-router-dom';
import StoryListItemHeader from './StoryListItemHeader';

type StoryCardProps = {
  story: StoryEnvelope,
  showHeader?: boolean
}

const DetailLinkStyle = {
  textDecoration: 'none',
  color: 'rgba(0, 0, 0, 0.87)',
};

export const StoryListItem = (props: StoryCardProps) => {
  return <ListItem sx={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
    <Card sx={{ minWidth: '100%', maxWidth: '100%' }} variant={'outlined'}>
      {props.showHeader ? <StoryListItemHeader story={props.story} /> : null}
      <CardActionArea>
        <CardContent>
          <Link style={DetailLinkStyle} to={linkHref(props.story._links, 'self')}>
            <Typography variant={'h6'}>{props.story.title}</Typography>
            <Typography variant='body2' color='text.secondary'>{props.story.description}</Typography>
          </Link>
        </CardContent>
      </CardActionArea>
    </Card>
  </ListItem>;
};

export default StoryListItem;