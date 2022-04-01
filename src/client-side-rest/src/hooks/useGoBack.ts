import { useLocation } from 'react-router-dom';

export const useGoBack = () => {

  const location = useLocation();

  const displayArrow = (): boolean => {
    console.log(location.pathname);
    return !['', '/stories'].includes(location.pathname);
  };

  // useEffect(() => {
  //   displayArrow();
  // }, [window.location.pathname]);

  return { displayArrow };
};

export default useGoBack;