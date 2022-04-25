import create from 'zustand';
import jwtDecode from 'jwt-decode';
import { HateoasLink, JwtEnvelope, JwtPayload } from 'services/rest-api-service';

export type AppUser = {
  data: JwtPayload,
  _links: HateoasLink[]
};

const JWT_KEY = 'mthesis-rest-jwt';
const JWT_USER = 'mthesis-rest-user';

type UserStoreState = {
  jwt: string | null;
  user: AppUser | null;
  setUser: (jwt: JwtEnvelope) => void;
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
  setUser: (envelope: JwtEnvelope) => {
    localStorage.setItem(JWT_KEY, envelope.access_token);
    const _user: AppUser = {
      data: jwtDecode<JwtPayload>(envelope.access_token),
      _links: envelope._links
    };
    localStorage.setItem(JWT_USER, JSON.stringify(_user));
    set({
      jwt: envelope.access_token,
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
