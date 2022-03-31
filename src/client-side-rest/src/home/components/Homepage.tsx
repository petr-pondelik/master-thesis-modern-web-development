import {
  Navigate,
} from 'react-router-dom';

const Homepage = () => {
  return <Navigate replace to={'/stories/search'} />;
};

export default Homepage;
