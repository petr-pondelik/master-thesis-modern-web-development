import { useFetch } from '../../../hooks';
import { ErrorPlaceholder, StoriesList } from '../../../common';
import { Card, CardContent, Typography } from '@mui/material';
import { findLink, UserEnvelope } from '../../../api';

export const UserView = () => {
  const { response: user, loading: loading } = useFetch<UserEnvelope>(true, window.location.pathname);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (user) {
    const storiesLink = findLink(user._links, 'stories');
    return <Card sx={{ minWidth: '100%', maxWidth: '100%' }} variant={'elevation'} elevation={0}>
      <CardContent>
        <Typography variant={'h4'} style={{ marginBottom: '2rem' }}>
          {user.givenName} {user.familyName}
        </Typography>
        <Typography variant={'body1'} style={{ marginBottom: '2rem' }}>
          {user.profileDescription}
        </Typography>
        <Typography variant={'h5'}>
          Stories
        </Typography>
        <StoriesList fetchLink={storiesLink} />
      </CardContent>
    </Card>;
  }

  return <ErrorPlaceholder />;
};

export default UserView;