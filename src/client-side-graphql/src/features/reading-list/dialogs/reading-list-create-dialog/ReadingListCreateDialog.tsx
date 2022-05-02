import { Fragment, useState } from 'react';
import Box from '@mui/material/Box';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { CreateReadingListContent, useCreateReadingListMutation } from 'services/graphql-api-service';
import { useUserStore } from 'stores';
import { FullscreenDialog } from 'features/core';
import { ReadingListForm } from 'features/reading-list';
import { useApolloClient } from '@apollo/client';

export type CreateDialogState = {
  open: boolean;
  actionEnabled: boolean;
  dto: CreateReadingListContent;
};

export const ReadingListCreateDialog = () => {
  const apolloClient = useApolloClient();
  const user = useUserStore((state) => state.user);
  if (!user) {
    return null;
  }

  const [open, setOpen] = useState<boolean>(false);
  const [actionEnabled, setActionEnabled] = useState<boolean>(false);
  const [dto, setDto] = useState<CreateReadingListContent>({
    title: '',
    authorId: user.sub,
  });

  const createCallback = () => {
    handleClose();
    apolloClient.refetchQueries({
      include: ['UserReadingLists', 'UserReadingListsWithStories'],
    });
  };

  const [createReadingList] = useCreateReadingListMutation({ content: dto }, () => createCallback());

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (user) {
      createReadingList();
    }
  };

  const update = (stateFragment: Partial<CreateDialogState>) => {
    if (stateFragment.dto) {
      setDto({ ...dto, ...stateFragment.dto });
    }
    if (stateFragment.actionEnabled) {
      setActionEnabled(stateFragment.actionEnabled);
    }
  };

  return (
    <Fragment>
      <Box sx={{ '& > :not(style)': { m: 1 }, position: 'fixed', bottom: '2%', right: '2%' }} onClick={handleOpen}>
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Box>
      <FullscreenDialog
        title={'Create Reading List'}
        isOpened={open}
        actionEnabled={actionEnabled}
        handleClose={handleClose}
        handleAction={handleSave}
        containedElement={<ReadingListForm updateParent={update} />}
      />
    </Fragment>
  );
};
