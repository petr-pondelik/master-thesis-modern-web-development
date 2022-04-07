import { Fragment, ReactNode } from 'react';
import { Avatar, CardHeader, IconButton } from '@mui/material';
import { EntityDelete } from '../EntityDelete';
import { red } from '@mui/material/colors';
import CustomLink from '../../CustomLink';
import { User } from '../../../../graphql';
import { Paths } from '../../../helpers';

type EntityCardHeaderProps = {
  title: string,
  subheader: string,
  updateNode: ReactNode,
  author: User
}

export const EntityCardHeader = (props: EntityCardHeaderProps) => {

  const { title, subheader, updateNode, author } = props;

  const renderUpdate = () => {
    return <IconButton aria-label='settings'>
      {updateNode}
    </IconButton>;
  };

  const renderDelete = () => {
    return <EntityDelete />
  };

  const renderAuthor = () => {
    return <CustomLink to={Paths.users(author.id)}>
      <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
        {author.givenName?.charAt(0) ?? '...'}
      </Avatar>
    </CustomLink>;
  };

  return <CardHeader
    title={title}
    subheader={subheader}
    avatar={renderAuthor()}
    action={
      <Fragment>
        {renderUpdate()}
        {renderDelete()}
      </Fragment>
    }
  />;
};