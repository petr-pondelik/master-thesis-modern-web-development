import { ErrorMessage } from './error.message';
import { JwtEnvelope, ResponseEnvelope } from './envelope';

export const isError = (response: ErrorMessage | ResponseEnvelope<any> | JwtEnvelope): boolean => {
  return !!(<ErrorMessage>response).statusCode && !!(<ErrorMessage>response).message;
}
