import { useLocation } from 'react-router-dom';

export const useGoBack = () => {
  const location = useLocation();
  const displayArrow = (): boolean => {
    return !location.pathname.match(/^(\/stories|\/users\/\d\/stories|\/users\/\d\/reading-lists)$/)
  };
  return { displayArrow };
};

export default useGoBack;