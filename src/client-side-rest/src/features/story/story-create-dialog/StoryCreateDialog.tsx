import { Fragment, useState } from 'react';
import { useMutation } from 'react-query';
import { CreateStoryDto, HateoasLink, HttpRequest, StoryEnvelope } from 'services/rest-api-service';
import Box from '@mui/material/Box';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useUserStore } from 'store';
import { FullscreenDialog } from 'features/core/dialogs';
import { StoryForm } from 'features/story';

export type StoryCreateDialogState = {
  open: boolean,
  actionEnabled: boolean,
  dto: CreateStoryDto
}

export const StoryCreateDialog = (props: { createLink: HateoasLink, refetch: any }) => {

  const { createLink, refetch } = props;

  const user = useUserStore(state => state.user);
  if (!user) {
    return null;
  }

  const [open, setOpen] = useState<boolean>(false);
  const [actionEnabled, setActionEnabled] = useState<boolean>(false);
  const [dto, setDto] = useState<CreateStoryDto>(
    {
      title: '',
      description: '',
      content: '',
      authorId: user.data.sub,
    });

  const mutation = useMutation(
    (dto: CreateStoryDto) => HttpRequest<StoryEnvelope, CreateStoryDto>(createLink.href, createLink.method, dto),
    {
      onSuccess: () => {
        refetch();
      },
    },
  );

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen( false);
  };

  const handleSave = () => {
    if (user) {
      mutation.mutate(dto);
      handleClose();
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