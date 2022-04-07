import { Fragment } from 'react';
import { UserCard } from '../user-card';
import { UserStories } from '../user-stories';
import Shell_UserView from './Shell_UserView';
import { User } from '../../../graphql';
import { ApolloError } from '@apollo/client';

export const UserView = (props: {
  user: User | undefined;
  isLoading: boolean;
  error: ApolloError | undefined;
  refetch?: unknown;
}) => {
  const { user, isLoading, error } = props;
  if (isLoading) {
    return <Shell_UserView />;
  }
  return (
    <Fragment>
      <UserCard user={user} isLoading={isLoading} />
      <UserStories user={user} isLoading={isLoading} error={error} />
    </Fragment>
  );
};

export default UserView;
