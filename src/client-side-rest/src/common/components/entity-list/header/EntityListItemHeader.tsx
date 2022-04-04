import { Avatar, CardActionArea, CardHeader } from '@mui/material';
import CustomLink from '../../CustomLink';
import { findLink, HttpRequest, UserEnvelope } from '../../../../api';
import { red } from '@mui/material/colors';
import { formatAuthor } from '../../../helpers';
import { useQuery } from 'react-query';
import { EntityDelete } from '../../entity-card';
import { Fragment } from 'react';

export const EntityListItemHeader = (props: { entity: any, refetch?: any }) => {
  const { entity, refetch } = props;
  const authorLink = findLink(entity._links, 'author');

  const fetchMethod = () => HttpRequest<UserEnvelope>(authorLink.href, authorLink.method);
  const { data: author, isLoading: authorLoading, error: authorError } = useQuery<UserEnvelope>(
    authorLink.href, fetchMethod, {
      enabled: entity.author === undefined,
    },
  );

  const getAuthor = () => {
    return entity.author ?? author ?? undefined;
  };

  const getDeleteAction = () => {
    const deleteLink = findLink(entity._links, 'delete');
    if (deleteLink.href) {
      return <EntityDelete deleteLink={deleteLink} refetch={refetch} />;
    }
    return null;
  };

  return <CardHeader
    avatar={
      <CardActionArea>
        <CustomLink to={authorLink.href} state={{ resource: authorLink }}>
          <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
            {getAuthor()?.familyName?.charAt(0) ?? '...'}
          </Avatar>
        </CustomLink>
      </CardActionArea>
    }
    title={formatAuthor(getAuthor())}
    subheader={entity.createdAt}
    action={<Fragment>{getDeleteAction()}</Fragment>}
  />;
};

export default EntityListItemHeader;