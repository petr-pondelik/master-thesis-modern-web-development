import { Avatar, CardActionArea, CardHeader } from '@mui/material';
import CustomLink from '../../custom-link/CustomLink';
import { red } from '@mui/material/colors';
import { formatAuthor, Paths } from 'helpers';
import { EntityDelete } from '../../entity-card';

type EntityListItemHeaderProps = {
  entity: any,
  deleteMutation?: any;
}

export const EntityListItemHeader = (props: EntityListItemHeaderProps) => {
  const { entity, deleteMutation } = props;
  const author = entity.author;

  const getDeleteAction = () => {
    if (deleteMutation) {
      return <EntityDelete entityId={entity.id} mutation={deleteMutation} />;
    }
    return null;
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
    action={getDeleteAction()}
  />;
};

export default EntityListItemHeader;