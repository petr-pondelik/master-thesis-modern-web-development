import { Card, CardContent, Typography } from '@mui/material';
import { EntityList } from '../../../common';
import { Shell_UserStories } from './Shell_UserStories';
import { User } from '../../../graphql';
import { ApolloError } from '@apollo/client';

export const UserStories = (props: { user: User | undefined; isLoading: boolean; error: ApolloError | undefined }) => {
  const { user, isLoading, error } = props;

  if (isLoading || !user) {
    return <Shell_UserStories />;
  }

  return (
    <Card elevation={0}>
      <CardContent>
        <Typography variant={'h5'}>Stories</Typography>
        <EntityList items={user.stories} itemPath={'/stories'} isLoading={isLoading} error={error} showHeader={false} />
      </CardContent>
    </Card>
  );
};
