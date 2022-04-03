import { SignInDto } from '../sign-in';
import { useEffect, useState } from 'react';
import { JwtEnvelope } from '../api';
import { ErrorMessage, HttpRequest } from '../api';
import { isError } from '../api/api.helpers';
import { StatusCodes } from '../common';
import { useJwtStore } from '../store';
import { useNavigate } from 'react-router-dom';

export const useSignIn = (call: boolean, dto: SignInDto) => {

  const [loading, setLoading] = useState(false);
  const [authorized, setAuthorized] = useState<boolean|undefined>(undefined);
  const [error, setError] = useState<ErrorMessage|undefined>(undefined);

  const setUser = useJwtStore(state => state.setUser);
  const navigate = useNavigate();

  const jwtSignIn = (res: JwtEnvelope) => {
    setUser(res.access_token);
    navigate('/');
  }

  useEffect(() => {
    if (call) {
      setLoading(true);
      HttpRequest('/auth/sign-in', 'POST', dto)
        .then(res => {
          const error = isError(res);
          if (error) {
            if (res.statusCode === StatusCodes.UNAUTHORIZED) {
              setAuthorized(false);
            }
          } else {
            jwtSignIn(res);
            setAuthorized(true);
          }
        })
        .catch((error) => {
          setAuthorized(false);
          setError(error);
        }).finally(() => {
        setLoading(false);
      });
    }
  }, [call]);

  return { authorized, loading, error };

};