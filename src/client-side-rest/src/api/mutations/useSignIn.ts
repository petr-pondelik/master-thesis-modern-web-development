import { SignInDto } from '../../sign-in';
import { HttpRequest, JwtEnvelope } from '../index';
import { ErrorMessage } from '../index';
import { useJwtStore } from '../../store';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';

export const useSignIn = (dto: SignInDto) => {
  const setUser = useJwtStore(state => state.setUser);
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
