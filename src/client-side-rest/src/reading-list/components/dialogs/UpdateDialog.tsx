import { findLink, HttpRequest, ReadingListEnvelope } from '../../../api';
import { Fragment, useState } from 'react';
import { useJwtStore } from '../../../store';
import { useMutation } from 'react-query';
import Box from '@mui/material/Box';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { FullscreenDialog } from '../../../common/components/dialogs';
import { UpdateReadingListDto } from '../../dto';

export type UpdateDialogState = {
  open: boolean,
  actionEnabled: boolean,
  dto: UpdateReadingListDto
}

export const UpdateDialog = (props: { readingLIst: ReadingListEnvelope, refetch: any }) => {

  const { readingLIst, refetch } = props;
  const updateLink = findLink(readingLIst._links, 'update');

  const [state, setState] = useState<UpdateDialogState>({
    open: false,
    actionEnabled: false,
    dto: {  title: '' },
  });

  const mutation = useMutation(
    (dto: UpdateReadingListDto) =>
      HttpRequest<ReadingListEnvelope, UpdateReadingListDto>(updateLink.href, updateLink.method, dto),
    {
      onSuccess: () => {
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
    mutation.mutate(state.dto);
    handleClose();
  };

  const update = (stateFragment: Partial<UpdateDialogState>) => {
    setState({ ...state, ...stateFragment });
  };

  const containedForm = () => {
    return <p>TEST</p>
    // return <StoryForm updateParent={update} />;
  };

  return (
    <Fragment>
      <Box sx={{ '& > :not(style)': { m: 1 }, position: 'fixed', bottom: '2%', right: '2%' }} onClick={handleOpen}>
        <Fab color='primary' aria-label='add'>
          <AddIcon />
        </Fab>
      </Box>
      <FullscreenDialog
        title={readingLIst.title}
        isOpened={state.open}
        actionEnabled={state.actionEnabled}
        handleClose={handleClose}
        handleAction={handleSave}
        containedElement={containedForm()}
      />
    </Fragment>
  );
};