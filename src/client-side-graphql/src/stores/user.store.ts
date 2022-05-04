import create from 'zustand';
import jwtDecode  from 'jwt-decode';
import { AuthPayload, JwtPayload } from 'services/graphql-api-service';

export type AppUser = JwtPayload;

const JWT_KEY = 'mwd-graphql-jwt';
const JWT_USER = 'mwd-graphql-user';

type UserStoreState = {
  jwt: string | null;
  user: AppUser | null;
  setUser: (jwt: AuthPayload) => void;
  removeUser: () => void;
};

export const getJwtFromStorage = (): string | null => {
  return localStorage.getItem(JWT_KEY);
};

export const getUserFromStorage = (): AppUser | null => {
  const userStr = localStorage.getItem(JWT_USER);
  return userStr ? JSON.parse(userStr) : null;
};

export const useUserStore = create<UserStoreState>((set) => ({
  jwt: getJwtFromStorage(),
  user: getUserFromStorage(),
  setUser: (payload: AuthPayload) => {
    localStorage.setItem(JWT_KEY, payload.access_token);
    const _user: AppUser = jwtDecode<AppUser>(payload.access_token);
    localStorage.setItem(JWT_USER, JSON.stringify(_user));
    set({
      jwt: payload.access_token,
      user: _user
    });
  },
  removeUser: () => {
    localStorage.removeItem(JWT_KEY);
    localStorage.removeItem(JWT_USER);
    set({
      jwt: null,
      user: null,
    });
  },
}));
