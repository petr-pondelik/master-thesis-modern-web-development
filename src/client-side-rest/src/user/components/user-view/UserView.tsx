import { UserEnvelope } from '../../../api';
import { Fragment } from 'react';
import { UserCard } from '../user-card';
import { UserStories } from '../user-stories';
import Shell_UserView from './Shell_UserView';

export const UserView = (props: { user: UserEnvelope | undefined, isLoading: boolean, refetch: unknown }) => {

  const {user, isLoading} = props;

  if (isLoading) {
    return <Shell_UserView/>
  }

  // // Then get the user's projects
  // const { data: stories } = useQuery<StoryCollectionEnvelope>(
  //   ['usersStories' + user?.id],
  //   fetchMethod,
  //   {
  //     // The query will not execute until the storiesLink exists
  //     enabled: !!user,
  //   },
  // );

  return <Fragment>
      <UserCard user={user} isLoading={isLoading}/>
      <UserStories user={user} isLoading={isLoading} />
    </Fragment>
};

export default UserView;