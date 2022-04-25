import { Fragment } from 'react';
import { Shell_UserCard } from '../user-card';
import { Shell_UserStories } from '../user-stories';

export const Shell_UserView = () => {
  return <Fragment>
    <Shell_UserCard/>
    <Shell_UserStories/>
  </Fragment>
}

export default Shell_UserView;