import { Fragment } from 'react';
import { Shell_UserView, UserCard } from 'features/user';
import { UserStories } from 'features/user';
import { UserEnvelope } from 'services/rest-api-service';

export const UserView = (props: { user: UserEnvelope | undefined; isLoading: boolean }) => {
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
