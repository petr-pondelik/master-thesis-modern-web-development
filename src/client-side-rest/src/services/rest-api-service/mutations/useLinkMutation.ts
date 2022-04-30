import { UseMutationOptions, UseMutationResult } from 'react-query/types/react/types';
import HttpRequest from '../http-request';
import { HateoasLink } from '../types';
import { useMutation } from 'react-query';

export function useLinkMutation<
  TData = unknown,
  TError = unknown,
  TVariables = unknown,
  TContext = unknown,
>(
  link: HateoasLink,
  dto: TVariables,
  options?: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationKey' | 'mutationFn'>,
): UseMutationResult<TData, TError, TVariables, TContext> {
  console.log(dto);
  const mutationFunction = (dto?: TVariables) => HttpRequest<TData, TVariables>(link.href, link.method, dto);
  return useMutation<TData, TError, TVariables, TContext>(mutationFunction, options);
}
