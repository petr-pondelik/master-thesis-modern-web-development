import { getRequest, HttpRequest, StoryCollectionEnvelope, UserEnvelope } from '../../../api';
import { useQuery } from 'react-query';
import { Fragment } from 'react';
import { UserCard } from './user-card/UserCard';
import { UserStories } from './user-stories/UserStories';
import { Shell_UserCard } from './user-card/Shell_UserCard';
import Shell_UserView from './Shell_UserView';

export const UserView = () => {
  const { data: user, isLoading } = useQuery<UserEnvelope>(
    window.location.pathname, () => getRequest<UserEnvelope>(window.location.pathname),
  );

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