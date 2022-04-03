import { Avatar, CardHeader, IconButton } from '@mui/material';
import { CustomLink, formatAuthor } from '../../../../common';
import { red } from '@mui/material/colors';
import { Fragment } from 'react';
import { findLink, linkHref, StoryEnvelope } from '../../../../api';
import { StoryDelete } from './StoryDelete';
import { StoryUpdate } from './StoryUpdate';


export const StoryCardHeader = (props: { story: StoryEnvelope }) => {

  const story = props.story;

  const renderUpdate = () => {
    const updateLink = findLink(story._links, 'update');
    if (updateLink) {
      return <IconButton aria-label='settings'>
        <StoryUpdate link={updateLink} />
      </IconButton>;
    }
    return null;
  };

  const renderDelete = () => {
    const deleteLink = findLink(story._links, 'delete');
    const parentLink = findLink(story._links, 'parent');
    if (deleteLink && parentLink) {
      return <IconButton aria-label='settings'>
        <StoryDelete deleteLink={deleteLink} parentLink={parentLink} />
      </IconButton>;
    }
    return null;
  };

  return <CardHeader
    title={formatAuthor(story.author)}
    subheader={story.createdAt}
    avatar={
      <CustomLink to={linkHref(story._links, 'author')}>
        <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
          R
        </Avatar>
      </CustomLink>
    }
    action={
      <Fragment>
        {renderUpdate()}
        {renderDelete()}
      </Fragment>
    }
  />;

};