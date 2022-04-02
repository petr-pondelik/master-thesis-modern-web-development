import { useEffect, useState } from 'react';
import { HttpRequest } from '../api';
import { HttpMethod } from '../common';

export function useFetch<T>(url: string, method: HttpMethod = 'GET', dto: any = {}) {
  const [response, setResponse] = useState<T>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    HttpRequest(url, method, dto)
      .then(res => {
        setResponse(res);
      })
      .catch((error) => {
        setError(error);
      }).finally(() => {
      setLoading(false);
    });
  }, [url, method]);

  const reFetch = () => {
    setLoading(true);
    HttpRequest(url, method, dto)
      .then(res => {
        setResponse(res);
      })
      .catch((error) => {
        setError(error);
      }).finally(() => {
      setLoading(false);
    });
  }

  return { response, loading, error, reFetch };
}

export default useFetch;
