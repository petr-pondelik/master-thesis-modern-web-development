import { Fragment, useState } from 'react';
import { FullscreenDialog } from '../../../common/components/dialogs';
import { StoryForm } from '../forms';
import { useMutation } from 'react-query';
import { CreateStoryDto } from '../../dto';
import { HateoasLink, HttpRequest, StoryEnvelope } from '../../../api';
import Box from '@mui/material/Box';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useJwtStore } from '../../../store';

export type StoryCreateDialogState = {
  open: boolean,
  actionEnabled: boolean,
  dto: CreateStoryDto
}

export const StoryCreateDialog = (props: { createLink: HateoasLink, refetch: any }) => {

  const { createLink, refetch } = props;

  const [state, setState] = useState<StoryCreateDialogState>({
    open: false,
    actionEnabled: false,
    dto: {
      title: '',
      description: '',
      content: '',
      authorId: 1,
    },
  });

  const user = useJwtStore(state => state.user);

  const mutation = useMutation(
    (dto: CreateStoryDto) => HttpRequest<StoryEnvelope, CreateStoryDto>(createLink.href, createLink.method, dto),
    {
      onSuccess: data => {
        refetch();
      },
    },
  );

  const handleOpen = () => {
    setState({ ...state, ['open']: true });
  };

  const handleClose = () => {
    setState({ ...state, ['open']: false });
  };

  const handleSave = () => {
    if (user) {
      const dto = { ...state.dto, ['authorId']: user.sub };
      mutation.mutate(dto);
      handleClose();
    }
  };

  const update = (stateFragment: Partial<StoryCreateDialogState>) => {
    setState({ ...state, ...stateFragment });
  };

  const containedForm = () => {
    return <StoryForm updateParent={update} />;
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
        isOpened={state.open}
        isActionEnabled={state.actionEnabled}
        handleClose={handleClose}
        handleAction={handleSave}
        containedElement={containedForm()}
      />
    </Fragment>
  );
};