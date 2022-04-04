import { Avatar, CardActionArea, CardHeader } from '@mui/material';
import CustomLink from '../../CustomLink';
import { findLink, linkHref } from '../../../../api';
import { red } from '@mui/material/colors';
import { formatAuthor } from '../../../helpers';

export const EntityListItemHeader = (props: { entity: any }) => {
  const { entity } = props;
  const authorLink = findLink(entity._links, 'author');
  return <CardActionArea>
    <CustomLink to={authorLink.href} state={{ resource: authorLink }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
            R
          </Avatar>
        }
        title={formatAuthor(entity.author)}
        subheader={entity.createdAt}
      />
    </CustomLink>
  </CardActionArea>;
};

export default EntityListItemHeader;