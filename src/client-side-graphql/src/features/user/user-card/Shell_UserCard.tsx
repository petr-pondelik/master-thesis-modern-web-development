import { Card, CardContent, Typography } from '@mui/material';

export const Shell_UserCard = () => {
  return <Card sx={{ minWidth: '100%', maxWidth: '100%' }} elevation={0}>
    <CardContent>
      <Typography variant={'h4'} style={{ marginBottom: '2rem' }}>
        ...
      </Typography>
      <Typography variant={'body1'} style={{ marginBottom: '2rem' }}>
        ...
      </Typography>
    </CardContent>
  </Card>;
}