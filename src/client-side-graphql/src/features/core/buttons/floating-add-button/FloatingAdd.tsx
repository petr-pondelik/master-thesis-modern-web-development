import Box from '@mui/material/Box';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { MouseEventHandler } from 'react';

export const FloatingAddButton = (props: {onClick?: MouseEventHandler<unknown> | undefined}) => {
  const onClick = props.onClick;
  return (
    <Box sx={{ '& > :not(style)': { m: 1 }, position: "fixed", bottom: '2%', right: '2%' }} onClick={onClick}>
      <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </Box>
  );
}
