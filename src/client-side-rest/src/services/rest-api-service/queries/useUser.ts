import { useQuery } from 'react-query';
import { UserEnvelope } from '../envelope';
import { HttpRequest } from 'helpers';

export const useUser = (id: number) => {
  return useQuery<UserEnvelope>(
    ['user', id], () => HttpRequest<UserEnvelope>(`/users/${id}`),
  );
}