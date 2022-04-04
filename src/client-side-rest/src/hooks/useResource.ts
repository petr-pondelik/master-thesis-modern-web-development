import { useLocation, useNavigate } from 'react-router-dom';
import { useLinksStore } from '../store';
import { createLink, HateoasLink } from '../api';

export const useResource = (key: string) => {
  const findLink = useLinksStore(state => state.find);
  const addLink = useLinksStore(state => state.add);
  const location = useLocation();
  const navigate = useNavigate();

  const locationState = location.state as any;
  let link = undefined;
  if (locationState) {
    link = locationState.resource as HateoasLink | undefined;
  }

  if (link) {
    addLink(key, link);
    return link;
  }

  link = findLink(key);
  if (!link) {
    navigate('/');
  }

  return link ?? createLink('GET', '', 'self');
};
