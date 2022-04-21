import { useQuery } from 'react-query';
import { UserEnvelope } from '../envelope';
import HttpRequest from '../http-request';

export const userUser = (id: number) => {
  return useQuery<UserEnvelope>(
    ['user', id], () => HttpRequest<UserEnvelope>(`/users/${id}`),
  );
}