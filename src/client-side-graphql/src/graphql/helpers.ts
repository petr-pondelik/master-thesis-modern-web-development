import { ErrorMessage } from './error.message';

export const isError = (response: ErrorMessage): boolean => {
  return !!(<ErrorMessage>response).statusCode && !!(<ErrorMessage>response).message;
};
