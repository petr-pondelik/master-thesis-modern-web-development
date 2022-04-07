import { Avatar, CardActionArea, CardHeader } from '@mui/material';
import CustomLink from '../../CustomLink';
import { red } from '@mui/material/colors';
import { formatAuthor, Paths } from '../../../helpers';
import { EntityDelete } from '../../entity-card';
import { Fragment } from 'react';
import { useJwtStore } from '../../../../store';

export const EntityListItemHeader = (props: { entity: any, refetch?: any }) => {
  const { entity, refetch } = props;
  const author = entity.author;
  const user = useJwtStore(state => state.user);

  const getDeleteAction = () => {
    if (!user || user.sub !== author.id) {
      return null;
    }
    return <EntityDelete refetch={refetch} />;
  };

  return <CardHeader
    avatar={
      <CardActionArea>
        <CustomLink to={Paths.users(author.id)}>
          <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
            {author.familyName.charAt(0) ?? '...'}
          </Avatar>
        </CustomLink>
      </CardActionArea>
    }
    title={formatAuthor(author)}
    subheader={entity.createdAt}
    action={<Fragment>{getDeleteAction()}</Fragment>}
  />;
};

export default EntityListItemHeader;