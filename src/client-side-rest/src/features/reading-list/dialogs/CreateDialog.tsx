import {
  CreateReadingListDto,
  HateoasLink,
  ReadingListEnvelope,
  useLinkMutation,
} from 'services/rest-api-service';
import { Fragment, useState } from 'react';
import Box from '@mui/material/Box';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useUserStore } from 'stores';
import { FullscreenDialog } from 'features/core/dialogs';
import { ReadingListForm } from 'features/reading-list';

export type CreateDialogState = {
  open: boolean,
  actionEnabled: boolean,
  dto: CreateReadingListDto
}

export const CreateDialog = (props: { createLink: HateoasLink, refetch: any }) => {

  const { createLink, refetch } = props;
  const user = useUserStore(state => state.user);
  if (!user) {
    return null;
  }

  const [open, setOpen] = useState<boolean>(false);
  const [actionEnabled, setActionEnabled] = useState<boolean>(false);
  const [dto, setDto] = useState<CreateReadingListDto>({
    title: '',
    authorId: user.data.sub,
  });

  const mutation = useLinkMutation<ReadingListEnvelope, CreateReadingListDto>(createLink, dto,     {
    onSuccess: () => {
      handleClose();
      refetch();
    },
  },);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (user) {
      mutation.mutate(dto);
    }
  };

  const update = (stateFragment: Partial<CreateDialogState>) => {
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