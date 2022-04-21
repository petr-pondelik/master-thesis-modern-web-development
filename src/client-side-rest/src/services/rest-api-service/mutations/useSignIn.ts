import { HttpRequest, JwtEnvelope, SignInDto } from '../index';
import { ErrorMessage } from '../index';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useUserStore } from 'store';

export const useSignIn = (dto: SignInDto) => {
  const setUser = useUserStore(state => state.setUser);
  const navigate = useNavigate();
  return useMutation<JwtEnvelope, ErrorMessage>('signIn', () =>
    HttpRequest<JwtEnvelope, SignInDto>('/auth/sign-in', 'POST', dto), {
      onSuccess: (data: JwtEnvelope) => {
        setUser(data);
        navigate('/');
      }
    }
  );
};
