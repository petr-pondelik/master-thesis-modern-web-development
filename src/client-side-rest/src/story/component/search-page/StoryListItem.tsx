import { PartialUserEntity } from '../../../entity';
import {
  Card,
  CardHeader,
  Avatar,
  ListItem,
  CardContent,
  Typography,
  CardActionArea,
} from '@mui/material';
import { red } from '@mui/material/colors';
import { linkHref } from '../../../rest-api/hateoas';
import { StoryEnvelope } from '../../../rest-api/envelope';
import { Link } from 'react-router-dom';

type StoryCardProps = {
  story: StoryEnvelope
}

const AuthorLinkStyle = {
  textDecoration: 'none',
  color: '#1976d2',
};

const DetailLinkStyle = {
  textDecoration: 'none',
  color: 'rgba(0, 0, 0, 0.87)',
};

export const StoryListItem = (props: StoryCardProps) => {

  const formatAuthor = (author: PartialUserEntity | undefined) => {
    return author ? `${author.givenName} ${author.familyName}` : '';
  };

  return <ListItem sx={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
    <Card sx={{ minWidth: '100%', maxWidth: '100%' }}>
      <CardActionArea>
        <Link style={AuthorLinkStyle} to={linkHref(props.story._links, 'author')}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
                R
              </Avatar>
            }
            title={formatAuthor(props.story.author)}
            subheader={props.story.createdAt}
          />
        </Link>
      </CardActionArea>
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