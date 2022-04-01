import { SignInDto } from '../sign-in';
import useFetch from './useFetch';
import { SignInValidationState } from '../sign-in/SignInForm';
import { useEffect, useState } from 'react';
import { JwtEnvelope } from '../rest-api/envelope/jwt.envelope';

export const useSignIn = (dto: SignInDto, validation: SignInValidationState) => {

  const [response, setResponse] = useState<JwtEnvelope>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (validation.email && validation.password) {
      const { response, loading, error } = useFetch<JwtEnvelope>('sign-in', 'POST', dto);
      setResponse(response);
      setLoading(loading);
      setError(error);
    }
  }, [dto]);

  return { response, loading, error };

};