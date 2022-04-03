import { AppBar, Button, Dialog, IconButton, Slide, Toolbar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { forwardRef, ReactElement, Ref } from 'react';
import { TransitionProps } from '@mui/material/transitions';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

type FullscreenDialogProps = {
  title: string,
  isOpened: boolean,
  isActionEnabled: boolean,
  handleClose: () => void,
  handleAction: () => void,
  containedElement: ReactElement
}

export const FullscreenDialog = (props: FullscreenDialogProps) => {

  const {title, isOpened, isActionEnabled, handleClose, handleAction, containedElement} = props;

  return <Dialog
    fullScreen
    open={isOpened}
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
          {title}
        </Typography>
        <Button autoFocus color='inherit' onClick={handleAction} disabled={!isActionEnabled}>
          save
        </Button>
      </Toolbar>
    </AppBar>
    {containedElement}
  </Dialog>
}