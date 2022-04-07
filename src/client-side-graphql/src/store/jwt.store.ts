import create from 'zustand';
import jwtDecode  from 'jwt-decode';
import { AuthPayload, JwtPayload } from '../graphql';

export type AppUser = JwtPayload;

type JwtState = {
  jwt: string | null;
  user: AppUser | null;
  setUser: (jwt: AuthPayload) => void;
  removeUser: () => void;
};

export const getJwtFromStorage = (): string | null => {
  return localStorage.getItem('mthesis-jwt');
};

export const getUserFromStorage = (): AppUser | null => {
  const userStr = localStorage.getItem('mthesis-user');
  return userStr ? JSON.parse(userStr) : null;
};

export const useJwtStore = create<JwtState>((set) => ({
  jwt: getJwtFromStorage(),
  user: getUserFromStorage(),
  setUser: (payload: AuthPayload) => {
    localStorage.setItem('mthesis-jwt', payload.access_token);
    const _user: AppUser = jwtDecode<AppUser>(payload.access_token);
    localStorage.setItem('mthesis-user', JSON.stringify(_user));
    set({
      jwt: payload.access_token,
      user: _user
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
