import { Card, CardContent, Typography } from '@mui/material';
import { EntityList, Paths } from '../../../common';
import { Shell_UserStories } from './Shell_UserStories';
import { User } from '../../../graphql';

export const UserStories = (props: { user: User | undefined; isLoading: boolean }) => {
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
