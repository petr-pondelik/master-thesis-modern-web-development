import { HateoasLink } from '../types';
import { useQuery } from 'react-query';
import HttpRequest from '../http-request';
import { UseQueryOptions } from 'react-query/types/react/types';
import { QueryKey } from 'react-query/types/core/types';

export function useLinkQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryKey: TQueryKey,
  link: HateoasLink,
  options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'>,
) {
  const fetchMethod = () => HttpRequest<TQueryFnData>(link.href, link.method);
  return useQuery<TQueryFnData, TError, TData, TQueryKey>(queryKey, fetchMethod, options);
}
