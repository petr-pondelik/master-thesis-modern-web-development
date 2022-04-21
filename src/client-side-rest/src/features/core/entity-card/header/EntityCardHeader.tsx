import { Fragment, ReactNode } from 'react';
import { Avatar, CardHeader, IconButton } from '@mui/material';
import { EntityDelete } from '../EntityDelete';
import { red } from '@mui/material/colors';
import CustomLink from '../../custom-link/CustomLink';
import { HateoasLink, UserEntity } from 'services/rest-api-service';

type EntityCardHeaderProps = {
  title: string,
  subheader: Date,
  parentLink: HateoasLink,
  updateLink: HateoasLink,
  deleteLink: HateoasLink,
  authorLink: HateoasLink,
  updateNode: ReactNode,
  author: Partial<UserEntity> | undefined
}

export const EntityCardHeader = (props: EntityCardHeaderProps) => {

  const { title, subheader, parentLink, updateLink, deleteLink, authorLink, updateNode, author } = props;

  const renderUpdate = () => {
    if (!updateLink.href) {
      return null;
    }
    return <IconButton aria-label='settings'>
      {updateNode}
    </IconButton>;
  };

  const renderDelete = () => {
    if (!deleteLink.href || !parentLink.href) {
      return null;
    }
    return <EntityDelete deleteLink={deleteLink} parentLink={parentLink} />
  };

  const renderAuthor = () => {
    if (!authorLink.href || !author) {
      return null;
    }
    return <CustomLink to={authorLink.href} state={{ resource: authorLink }}>
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