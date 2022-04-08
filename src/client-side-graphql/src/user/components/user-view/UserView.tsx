import { Fragment } from 'react';
import { UserCard } from '../user-card';
import { UserStories } from '../user-stories';
import Shell_UserView from './Shell_UserView';
import { UserWithStoriesQueryUser } from '../../../graphql/queries';

type UserViewProps = {
  user: UserWithStoriesQueryUser | undefined;
  isLoading: boolean;
  refetch?: any;
};

export const UserView = (props: UserViewProps) => {
  const { user, isLoading } = props;
  if (isLoading) {
    return <Shell_UserView />;
  }
  return (
    <Fragment>
      <UserCard user={user} isLoading={isLoading} />
      <UserStories user={user} isLoading={isLoading} />
    </Fragment>
  );
};

export default UserView;
