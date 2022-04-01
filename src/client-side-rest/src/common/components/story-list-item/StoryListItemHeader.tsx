import { Avatar, CardActionArea, CardHeader } from '@mui/material';
import AuthorLink from '../AuthorLink';
import { linkHref, StoryEnvelope } from '../../../rest-api';
import { red } from '@mui/material/colors';
import { formatAuthor } from '../../helpers';

type Props = {
  story: StoryEnvelope
}

export const StoryListItemHeader = (props: Props) => {
  return <CardActionArea>
    <AuthorLink to={linkHref(props.story._links, 'author')}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
            R
          </Avatar>
        }
        title={formatAuthor(props.story.author)}
        subheader={props.story.createdAt}
      />
    </AuthorLink>
  </CardActionArea>;
};

export default StoryListItemHeader;