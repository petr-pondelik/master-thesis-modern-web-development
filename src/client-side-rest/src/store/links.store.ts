import create from 'zustand';
import { HateoasLink } from '../api';

export type LinkPair = {key: string, link: HateoasLink};

type LinksState = {
  links: any,
  addMore: (pairs: LinkPair[]) => void,
  add: (key: string, link: HateoasLink) => void,
  find: (key: string) => HateoasLink | undefined
}

export const useLinksStore = create<LinksState>((set, get) => ({
  links: JSON.parse(localStorage.getItem('mthesis-links') ?? '{}'),
  add: (key: string, link: HateoasLink) => {
    const linksNew = get().links;
    linksNew[key] = link;
    localStorage.setItem('mthesis-links', JSON.stringify(linksNew));
    set({
      links: linksNew,
    });
  },
  addMore: (pairs: LinkPair[]) => {
    const linksNew = get().links;
    for (const p of pairs) {
      linksNew[p.key] = p.link;
    }
    localStorage.setItem('mthesis-links', JSON.stringify(linksNew));
    set({
      links: linksNew,
    });
  },
  find: (key: string): HateoasLink | undefined => {
    const links = get().links;
    return links[key];
  },
}));
