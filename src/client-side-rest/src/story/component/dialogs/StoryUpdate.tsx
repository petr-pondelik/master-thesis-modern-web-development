import { findLink, HttpRequest, StoryEnvelope } from '../../../api';
import EditIcon from '@mui/icons-material/Edit';
import { forwardRef, Fragment, ReactElement, Ref, useState } from 'react';
import { AppBar, Button, Dialog, IconButton, Slide, Toolbar, Typography } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import { StoryForm } from '../forms';
import { BaseStoryDto } from '../../dto';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export type StoryUpdateState = {
  open: boolean,
  saveEnabled: boolean,
  dto: BaseStoryDto
}

export const StoryUpdate = (props: { story: StoryEnvelope, refetch: any }) => {

  const {story, refetch} = props;
  const updateLink = findLink(story._links, 'update');

  const [state, setState] = useState<StoryUpdateState>({
    open: false,
    saveEnabled: !!story,
    dto: {
      title: story ? story.title : '',
      description: story ? story.description : '',
      content: story ? story.content : '',
    },
  });

  const navigate = useNavigate();
  const mutation = useMutation(
    (dto: BaseStoryDto) => HttpRequest<StoryEnvelope, BaseStoryDto>(updateLink.href, updateLink.method, dto),
    {
      onSuccess: data => {refetch()}
    }
  );

  const handleOpen = () => {
    setState({ ...state, ['open']: true });
  };

  const handleClose = () => {
    setState({ ...state, ['open']: false });
  };

  const handleSave = () => {
    const dto = state.dto;
    mutation.mutate(dto);
    navigate(window.location.pathname);
    handleClose();
  };

  const update = (stateFragment: Partial<StoryUpdateState>) => {
    console.log('STORY UPDATE');
    console.log(stateFragment);
    setState({ ...state, ...stateFragment });
  };

  return (
    <Fragment>
      <EditIcon onClick={handleOpen} />
      <Dialog
        fullScreen
        open={state.open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative', marginBottom: '4rem' }}>
          <Toolbar>
            <IconButton
              edge='start'
              color='inherit'
              onClick={handleClose}
              aria-label='close'
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
              {story.title}
            </Typography>
            <Button autoFocus color='inherit' onClick={handleSave} disabled={!state.saveEnabled}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <StoryForm story={story} updateParent={update} />
      </Dialog>
    </Fragment>
  );
};