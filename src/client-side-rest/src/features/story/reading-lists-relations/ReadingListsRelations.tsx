import { useState } from 'react';
import { Button, Dialog, DialogTitle, List, ListItem, ListItemText, Radio } from '@mui/material';
import {
  findLink,
  ReadingListCollectionEnvelope,
  ReadingListEnvelope,
  StoryCollectionEnvelope,
  StoryEnvelope,
  useLinkMutation,
} from 'services/rest-api-service';
import { AppUser } from 'stores';
import { useLinkQuery } from 'services/rest-api-service/queries';

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  user: AppUser;
  story: StoryEnvelope;
}

const ReadingListItem = (props: { readingList: ReadingListEnvelope; story: StoryEnvelope }) => {
  const { readingList, story } = props;
  const storiesLink = findLink(readingList._links, 'stories');
  const addStoryLink = findLink(readingList._links, 'addStory');
  const removeStoryLink = findLink(readingList._links, 'removeStory');

  const { data: storiesRes, refetch: refetchStories } = useLinkQuery<StoryCollectionEnvelope>(
    [`reading-list-stories`, readingList.id],
    storiesLink,
  );

  const stories: StoryEnvelope[] = storiesRes?.data ?? [];
  const containsStory = !!stories.find((item) => item.id === story.id);

  addStoryLink.href = addStoryLink.href.replace(':storyId', story.id.toString());
  const addStory = useLinkMutation(addStoryLink, undefined, {
    onSuccess: () => {
      refetchStories();
    },
  });

  removeStoryLink.href = removeStoryLink.href.replace(':storyId', story.id.toString());
  const removeStory = useLinkMutation(removeStoryLink, undefined, {
    onSuccess: () => {
      refetchStories();
    },
  });

  const handleListItemClick = () => {
    if (containsStory) {
      removeStory.mutate(undefined);
    } else {
      addStory.mutate(undefined);
    }
  };

  return (
    <ListItem button onClick={() => handleListItemClick()} key={readingList.id}>
      <ListItemText primary={readingList.title} />
      <Radio checked={containsStory} />
    </ListItem>
  );
};

function RelationsDialog(props: SimpleDialogProps) {
  const { onClose, open, user, story } = props;

  const handleClose = () => {
    onClose();
  };

  const fetchLink = findLink(user._links, 'reading-lists');
  const { data } = useLinkQuery<ReadingListCollectionEnvelope>(['my-reading-lists'], fetchLink);
  const readingLists = data?.data ?? [];

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Reading Lists</DialogTitle>
      <List sx={{ pt: 0 }}>
        {readingLists.map((readingList) => (
          <ReadingListItem readingList={readingList} story={story} key={readingList.id} />
        ))}
      </List>
    </Dialog>
  );
}

export const ReadingListsRelations = (props: { user: AppUser; story: StoryEnvelope }) => {
  const { user, story } = props;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Assign to Reading Lists
      </Button>
      <RelationsDialog open={open} onClose={handleClose} user={user} story={story} />
    </div>
  );
};
