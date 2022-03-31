import create from 'zustand';
import { getApiRoot } from '../rest-api';
import { HateoasLink, LinkRel } from '../rest-api/hateoas';

type LinksState = {
  rootLinks: HateoasLink[];
  fetchRootLinks: () => void,
  findByRel: (rel: LinkRel) => HateoasLink | undefined
}

const useLinksStore = create<LinksState>((set, get) => ({
  rootLinks: [],
  fetchRootLinks: async () => {
    const response = await getApiRoot();
    if (Array.isArray(response._links)) {
      set({ rootLinks: response._links });
    }
  },
  findByRel: (rel: LinkRel): HateoasLink | undefined => {
    const links = get().rootLinks;
    return links.find((item) => item.rel === rel);
  },
}));

export default useLinksStore;