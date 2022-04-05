import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText, Radio,
} from '@mui/material';
import {
  findLink,
  HttpRequest,
  JwtPayload,
  ReadingListCollectionEnvelope,
  ReadingListEnvelope,
  StoryCollectionEnvelope, StoryEnvelope,
} from '../../../api';
import { useMutation, useQuery } from 'react-query';

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  user: JwtPayload;
  story: StoryEnvelope;
}

const ReadingListItem = (props: { readingList: ReadingListEnvelope, story: StoryEnvelope }) => {
  const { readingList, story } = props;
  const storiesLink = findLink(readingList._links, 'stories');
  const addStoryLink = findLink(readingList._links, 'addStory');
  const removeStoryLink = findLink(readingList._links, 'removeStory');

  const { data: storiesRes, isLoading, error, refetch: refetchStories } = useQuery<StoryCollectionEnvelope>(
    [`reading-list-${readingList.id}-stories`],
    () => HttpRequest<StoryCollectionEnvelope>(storiesLink.href, storiesLink.method),
  );

  const stories: StoryEnvelope[] = storiesRes?.data ?? [];
  console.log(stories);

  const containsStory = !!stories.find((item) => item.id === story.id);

  const addStory = useMutation(
    (storyId: number) =>
      HttpRequest<boolean>(addStoryLink.href.replace(':storyId', storyId.toString()), addStoryLink.method),
    {
      onSuccess: () => {
        console.log('ADDED');
        refetchStories();
      },
    },
  );

  const removeStory = useMutation(
    (storyId: number) =>
      HttpRequest<boolean>(removeStoryLink.href.replace(':storyId', storyId.toString()), removeStoryLink.method),
    {
      onSuccess: () => {
        console.log('REMOVED');
        refetchStories();
      },
    },
  );

  const handleListItemClick = (storyId: number) => {
    if (containsStory) {
      removeStory.mutate(storyId);
    } else {
      addStory.mutate(storyId);
    }
  };

  return (
    <ListItem button onClick={() => handleListItemClick(story.id)} key={readingList.id}>
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
  const { data, isLoading, error, refetch } = useQuery<ReadingListCollectionEnvelope>(
    ['my-reading-lists'], () => HttpRequest<ReadingListCollectionEnvelope>(fetchLink.href, fetchLink.method),
  );

  const readingLists = data?.data ?? [];
  console.log(readingLists);

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

export const ReadingListsRelations = (props: { user: JwtPayload, story: StoryEnvelope }) => {
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
      <Button variant='outlined' onClick={handleClickOpen}>
        Assign to Reading Lists
      </Button>
      <RelationsDialog
        open={open}
        onClose={handleClose}
        user={user}
        story={story}
      />
    </div>
  );
};