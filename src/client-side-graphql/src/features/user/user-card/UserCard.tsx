import { Card, CardContent, Typography } from '@mui/material';
import { Shell_UserCard } from './Shell_UserCard';
import { UserWithStoriesQueryUser } from 'services/graphql-api-service';

export const UserCard = (props: { user: UserWithStoriesQueryUser | undefined, isLoading: boolean }) => {
  const { user, isLoading } = props;

  if (isLoading) {
    return <Shell_UserCard/>
  }

  return <Card sx={{ minWidth: '100%', maxWidth: '100%' }} elevation={0}>
    <CardContent>
      <Typography variant={'h4'} style={{ marginBottom: '2rem' }}>
        `${user?.givenName } ${user?.familyName}`
      </Typography>
      <Typography variant={'body1'} style={{ marginBottom: '2rem' }}>
        {user?.profileDescription}
      </Typography>
    </CardContent>
  </Card>;
};