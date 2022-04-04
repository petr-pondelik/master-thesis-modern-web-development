import { SignInDto } from '../sign-in';
import { useEffect, useState } from 'react';
import { HttpRequest, JwtEnvelope } from '../api';
import { ErrorMessage } from '../api';
import { isError } from '../api/api.helpers';
import { StatusCodes } from '../common';
import { useJwtStore } from '../store';
import { useNavigate } from 'react-router-dom';
import { useResource } from './useResource';

export const useSignIn = (call: boolean, dto: SignInDto) => {

  const [loading, setLoading] = useState(false);
  const [authorized, setAuthorized] = useState<boolean|undefined>(undefined);
  const [error, setError] = useState<ErrorMessage|undefined>(undefined);

  const setUser = useJwtStore(state => state.setUser);
  const navigate = useNavigate();
  const link = useResource('signIn');

  const jwtSignIn = (res: JwtEnvelope) => {
    setUser(res.access_token);
    navigate('/');
  }

  useEffect(() => {
    if (call) {
      setLoading(true);
      HttpRequest<JwtEnvelope|ErrorMessage, SignInDto>(link.href, link.method, dto)
        .then(res => {
          const error = isError(res);
          if (error) {
            if ((<ErrorMessage>res).statusCode === StatusCodes.UNAUTHORIZED) {
              setAuthorized(false);
            }
          } else {
            jwtSignIn(<JwtEnvelope>res);
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