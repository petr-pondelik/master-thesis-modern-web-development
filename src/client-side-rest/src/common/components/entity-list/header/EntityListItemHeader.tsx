import { Avatar, CardActionArea, CardHeader } from '@mui/material';
import CustomLink from '../../CustomLink';
import { linkHref } from '../../../../api';
import { red } from '@mui/material/colors';
import { formatAuthor } from '../../../helpers';

export const EntityListItemHeader = (props: { entity: any }) => {
  const { entity } = props;
  return <CardActionArea>
    <CustomLink to={linkHref(entity._links, 'author')}>
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