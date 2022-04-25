import { Card, CardContent, Typography } from '@mui/material';
import { UserWithStoriesQueryUser } from 'services/graphql-api-service';
import { Paths } from 'helpers';
import { Shell_UserStories } from 'features/user';
import { EntityList } from 'features/core';

export const UserStories = (props: { user: UserWithStoriesQueryUser | undefined; isLoading: boolean }) => {
  const { user, isLoading } = props;

  if (isLoading || !user) {
    return <Shell_UserStories />;
  }

  return (
    <Card elevation={0}>
      <CardContent>
        <Typography variant={'h5'}>Stories</Typography>
        <EntityList
          items={user.stories}
          itemPath={Paths.stories()}
          isLoading={isLoading}
          showHeader={false}
        />
      </CardContent>
    </Card>
  );
};
