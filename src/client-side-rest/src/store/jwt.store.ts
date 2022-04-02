import create from 'zustand';
import { JwtPayload } from '../api';

type JwtState = {
  jwt: JwtPayload | null,
  setJwt: (jwt: JwtPayload) => void
  removeJwt: () => void
}

const getJwtFromStorage = () => {
  const data = JSON.parse(localStorage.getItem('mthesis-jwt') ?? '{}')
  if (data === {}) {
    return null;
  }
  return data;
}

export const useJwtStore = create<JwtState>(set => ({
  jwt: getJwtFromStorage(),
  setJwt: _jwt => {
    localStorage.setItem('mthesis-jwt', JSON.stringify(_jwt));
    set({ jwt: _jwt });
  },
  removeJwt: () => {
    localStorage.removeItem('mthesis-jwt');
    set({ jwt: null });
  },
}));
