import { Avatar, CardHeader, IconButton } from '@mui/material';
import { CustomLink, formatAuthor } from '../../../../common';
import { red } from '@mui/material/colors';
import { Fragment } from 'react';
import { findLink, linkHref, StoryEnvelope } from '../../../../api';
import { Shell_StoryCardHeader } from './Shell_StoryCardHeader';
import { StoryDelete } from './StoryDelete';
import { StoryUpdateDialog } from '../../dialogs';


export const StoryCardHeader = (props: { story: StoryEnvelope | undefined, isLoading: boolean, refetch: any}) => {

  const { story, isLoading, refetch } = props;

  if (!story || isLoading) {
    return <Shell_StoryCardHeader />;
  }

  const renderUpdate = () => {
    const updateLink = findLink(story._links, 'update');
    if (updateLink.href) {
      return <IconButton aria-label='settings'>
        <StoryUpdateDialog story={story} refetch={refetch} />
      </IconButton>;
    }
    return null;
  };

  const renderDelete = () => {
    const deleteLink = findLink(story._links, 'delete');
    const parentLink = findLink(story._links, 'parent');
    if (deleteLink.href && parentLink.href) {
      return <IconButton aria-label='settings'>
        <StoryDelete deleteLink={deleteLink} parentLink={parentLink} />
      </IconButton>;
    }
    return null;
  };

  const renderAuthorLink = () => {
    if (!story) {
      return <CustomLink>
        <Avatar aria-label='recipe' />
      </CustomLink>;
    } else {
      return <CustomLink to={linkHref(story._links, 'author')}>
        <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
          {story.author?.givenName?.charAt(0)}
        </Avatar>
      </CustomLink>;
    }
  };

  return <CardHeader
    title={formatAuthor(story?.author)}
    subheader={story?.createdAt}
    avatar={renderAuthorLink()}
    action={
      <Fragment>
        {renderUpdate()}
        {renderDelete()}
      </Fragment>
    }
  />;

};