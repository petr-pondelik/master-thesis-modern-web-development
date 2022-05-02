import { Typography } from '@mui/material';

export const NotFound = () => {
  return (
    <div style={{ height: 'calc(100vh - 64px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Typography variant={'h1'} component={'h1'}>
        Not Found
      </Typography>
    </div>
  );
};
