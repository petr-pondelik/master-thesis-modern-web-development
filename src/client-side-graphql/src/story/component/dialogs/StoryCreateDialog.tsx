import { Fragment, useState } from 'react';
import { FullscreenDialog } from '../../../common/components/dialogs';
import { StoryForm } from '../forms';
import Box from '@mui/material/Box';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useJwtStore } from '../../../store';
import { useCreateStoryMutation } from '../../../graphql/mutations';
import { client, CreateStoryContent } from '../../../graphql';

export type StoryCreateDialogState = {
  open: boolean,
  actionEnabled: boolean,
  dto: CreateStoryContent
}

export const StoryCreateDialog = ( ) => {
  const user = useJwtStore(state => state.user);
  if (!user) {
    return null;
  }

  const [open, setOpen] = useState<boolean>(false);
  const [actionEnabled, setActionEnabled] = useState<boolean>(false);
  const [dto, setDto] = useState<CreateStoryContent>(
    {
      title: '',
      description: '',
      content: '',
      authorId: user.sub,
    });

  const createCallback = () => {
    handleClose();
    client.refetchQueries({
      include: ['UserStories']
    })
  }

  const [createStory] = useCreateStoryMutation({ content: dto }, () => createCallback());

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen( false);
  };

  const handleSave = () => {
    if (user) {
      createStory();
    }
  };

  const update = (stateFragment: Partial<StoryCreateDialogState>) => {
    if (stateFragment.dto) {
      setDto({...dto, ...stateFragment.dto});
    }
    if (stateFragment.actionEnabled) {
      setActionEnabled(stateFragment.actionEnabled);
    }
  };

  return (
    <Fragment>
      <Box sx={{ '& > :not(style)': { m: 1 }, position: 'fixed', bottom: '2%', right: '2%' }} onClick={handleOpen}>
        <Fab color='primary' aria-label='add'>
          <AddIcon />
        </Fab>
      </Box>
      <FullscreenDialog
        title={'Create Story'}
        isOpened={open}
        actionEnabled={actionEnabled}
        handleClose={handleClose}
        handleAction={handleSave}
        containedElement={<StoryForm updateParent={update} />}
      />
    </Fragment>
  );
};