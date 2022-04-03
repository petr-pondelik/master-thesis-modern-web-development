import create from 'zustand';
import { JwtPayload } from '../api';
import jwtDecode from 'jwt-decode';

type JwtState = {
  jwt: string | null,
  user: JwtPayload | null,
  setUser: (jwt: string) => void,
  removeUser: () => void
}

export const getJwtFromStorage = () => {
  return localStorage.getItem('mthesis-jwt');
};

export const getUserFromStorage = () => {
  const userStr = localStorage.getItem('mthesis-user');
  return userStr ? JSON.parse(userStr) : null;
};

export const useJwtStore = create<JwtState>(set => ({
  jwt: getJwtFromStorage(),
  user: getUserFromStorage(),
  setUser: _jwt => {
    localStorage.setItem('mthesis-jwt', _jwt);
    const _user: JwtPayload = jwtDecode(_jwt);
    localStorage.setItem('mthesis-user', JSON.stringify(_user));
    set({
      jwt: _jwt,
      user: _user,
    });
  },
  removeUser: () => {
    localStorage.removeItem('mthesis-jwt');
    localStorage.removeItem('mthesis-user');
    set({
      jwt: null,
      user: null,
    });
  },
}));
