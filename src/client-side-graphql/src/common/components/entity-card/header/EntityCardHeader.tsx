import { Fragment, ReactNode } from 'react';
import { Avatar, CardHeader, IconButton } from '@mui/material';
import { red } from '@mui/material/colors';
import CustomLink from '../../CustomLink';
import { Paths } from '../../../helpers';

type EntityCardHeaderProps = {
  title: string,
  subheader: string,
  updateNode: ReactNode,
  deleteNode: ReactNode,
  author: any,
}

export const EntityCardHeader = (props: EntityCardHeaderProps) => {

  const { title, subheader, updateNode, deleteNode, author } = props;

  const renderUpdate = () => {
    return <IconButton aria-label='settings'>
      {updateNode}
    </IconButton>;
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
        {deleteNode}
      </Fragment>
    }
  />;
};