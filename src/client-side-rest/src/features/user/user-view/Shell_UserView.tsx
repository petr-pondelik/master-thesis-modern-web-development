import { Fragment } from 'react';
import { Shell_UserCard, Shell_UserStories } from 'features/user';

export const Shell_UserView = () => {
  return <Fragment>
    <Shell_UserCard/>
    <Shell_UserStories/>
  </Fragment>
}

export default Shell_UserView;