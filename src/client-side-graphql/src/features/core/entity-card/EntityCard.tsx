import { Card } from '@mui/material';
import { ReactNode } from 'react';

export const EntityCard = (props: { children: ReactNode }) => {
  const { children } = props;
  return <Card sx={{ minWidth: '100%', maxWidth: '100%' }} variant={'elevation'} elevation={0}>
    {children}
  </Card>;
};