import {
  Navigate,
} from 'react-router-dom';

const Homepage = () => {
  return <Navigate replace to={'/stories'} />;
};

export default Homepage;
