import create from 'zustand';
import { HateoasLink, LinkRel } from '../rest-api';

type LinksState = {
  rootLinks: HateoasLink[];
  findByRel: (rel: LinkRel) => HateoasLink | undefined
}

const useLinksStore = create<LinksState>((set, get) => ({
  rootLinks: [],
  findByRel: (rel: LinkRel): HateoasLink | undefined => {
    const links = get().rootLinks;
    return links.find((item) => item.rel === rel);
  },
}));

export default useLinksStore;