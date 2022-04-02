import { SignInDto } from '../sign-in';
import { useEffect, useState } from 'react';
import { JwtEnvelope, JwtPayload } from '../api';
import { ErrorMessage, HttpRequest } from '../api';
import { isError } from '../api/api.helpers';
import { StatusCodes } from '../common';
import jwtDecode from 'jwt-decode';
import { useJwtStore } from '../store';
import { useNavigate } from 'react-router-dom';

export const useSignIn = (perform: boolean, dto: SignInDto) => {

  const [loading, setLoading] = useState(false);
  const [authorized, setAuthorized] = useState<boolean|undefined>(undefined);
  const [error, setError] = useState<ErrorMessage|undefined>(undefined);

  const setJwt = useJwtStore(state => state.setJwt);
  const navigate = useNavigate();

  const jwtSignIn = (res: JwtEnvelope) => {
    const jwt: JwtPayload = jwtDecode(res.access_token);
    setJwt(jwt);
    navigate('/');
  }

  useEffect(() => {
    if (perform) {
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
  }, [perform]);

  return { authorized, loading, error };

};