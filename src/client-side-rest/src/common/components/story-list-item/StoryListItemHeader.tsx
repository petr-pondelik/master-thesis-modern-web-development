import { Avatar, CardActionArea, CardHeader } from '@mui/material';
import CustomLink from '../CustomLink';
import { linkHref, StoryEnvelope } from '../../../rest-api';
import { red } from '@mui/material/colors';
import { formatAuthor } from '../../helpers';

type Props = {
  story: StoryEnvelope
}

export const StoryListItemHeader = (props: Props) => {
  return <CardActionArea>
    <CustomLink to={linkHref(props.story._links, 'author')}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
            R
          </Avatar>
        }
        title={formatAuthor(props.story.author)}
        subheader={props.story.createdAt}
      />
    </CustomLink>
  </CardActionArea>;
};

export default StoryListItemHeader;