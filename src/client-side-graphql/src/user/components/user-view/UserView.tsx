import { Fragment } from 'react';
import { UserCard } from '../user-card';
import { UserStories } from '../user-stories';
import Shell_UserView from './Shell_UserView';
import { User } from '../../../graphql';

export const UserView = (props: { user: User | undefined; isLoading: boolean; refetch?: unknown }) => {
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
