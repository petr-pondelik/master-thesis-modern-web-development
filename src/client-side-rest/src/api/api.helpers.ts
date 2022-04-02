import { ErrorMessage } from './error.message';
import { ResponseEnvelope } from './envelope';

export const isError = (response: ErrorMessage | ResponseEnvelope<any>): boolean => {
  return !!(<ErrorMessage>response).statusCode && !!(<ErrorMessage>response).message;
}
