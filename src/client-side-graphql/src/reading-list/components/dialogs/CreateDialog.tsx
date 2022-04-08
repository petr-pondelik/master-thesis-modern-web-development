import { Fragment, useState } from 'react';
import { useJwtStore } from '../../../store';
import Box from '@mui/material/Box';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { FullscreenDialog } from '../../../common/components/dialogs';
import { CreateReadingListDto } from '../../dto';
import { ReadingListForm } from '../forms';
import { useCreateReadingListMutation } from '../../../graphql/mutations';
import { apolloClient } from '../../../graphql';

export type CreateDialogState = {
  open: boolean;
  actionEnabled: boolean;
  dto: CreateReadingListDto;
};

export const CreateDialog = () => {
  const user = useJwtStore((state) => state.user);
  if (!user) {
    return null;
  }

  const [open, setOpen] = useState<boolean>(false);
  const [actionEnabled, setActionEnabled] = useState<boolean>(false);
  const [dto, setDto] = useState<CreateReadingListDto>({
    title: '',
    authorId: user.sub,
  });

  const createCallback = () => {
    handleClose();
    apolloClient.refetchQueries({
      include: ['UserReadingLists'],
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
