import { Fragment, useState } from 'react';
import { FloatingAddButton, FullscreenDialog } from 'features/core';
import { StoryForm } from 'features/story';
import { useUserStore } from 'stores';
import { CreateStoryContent, useCreateStoryMutation } from 'services/graphql-api-service';
import { useApolloClient } from '@apollo/client';

export type StoryCreateDialogState = {
  open: boolean,
  actionEnabled: boolean,
  dto: CreateStoryContent
}

export const StoryCreateDialog = ( ) => {
  const user = useUserStore(state => state.user);
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
  const apolloClient = useApolloClient();

  const createCallback = () => {
    handleClose();
    apolloClient.refetchQueries({
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
      <FloatingAddButton onClick={handleOpen}/>
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