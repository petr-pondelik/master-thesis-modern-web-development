import { useMutation } from 'react-query';
import { HttpRequest } from 'helpers';
import { JwtEnvelope, SignInDto } from '../index';
import { ErrorMessage } from '../index';

export const useSignIn = (dto: SignInDto, successCallback: (data: JwtEnvelope) => void) => {
  return useMutation<JwtEnvelope, ErrorMessage>('signIn', () =>
    HttpRequest<JwtEnvelope, SignInDto>('/auth/sign-in', 'POST', dto), {
      onSuccess: successCallback
    }
  );
};
