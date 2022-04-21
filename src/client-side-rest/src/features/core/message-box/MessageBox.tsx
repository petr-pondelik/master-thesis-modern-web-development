import { Box, Typography } from '@mui/material';
import React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';

type MessageProps = {
  msg?: string | undefined,
  sx?: SxProps<Theme>
}

export const MessageBox: React.FC<MessageProps> = (props: MessageProps) => {
  return (
    <Box sx={props.sx}>
      <Typography variant={'body2'}>
        {props.msg}
      </Typography>
    </Box>
  );
};

export default MessageBox;