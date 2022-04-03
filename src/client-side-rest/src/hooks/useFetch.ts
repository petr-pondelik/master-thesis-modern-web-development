import { useEffect, useState } from 'react';
import { HttpRequest } from '../api';
import { HttpMethod } from '../common';

export function useFetch<T>(call: boolean, url: string, method: HttpMethod = 'GET', dto: any = undefined) {
  // const [response, setResponse] = useState<T>();
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  //
  // useEffect(() => {
  //   if (call) {
  //     setLoading(true);
  //     HttpRequest(url, method, dto)
  //       .then(res => {
  //         setResponse(res);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         setError(error);
  //       }).finally(() => {
  //       setLoading(false);
  //     });
  //   }
  // }, [call, url, method, dto]);
  //
  // const reFetch = () => {
  //   setLoading(true);
  //   HttpRequest(url, method, dto)
  //     .then(res => {
  //       setResponse(res);
  //     })
  //     .catch((error) => {
  //       setError(error);
  //     }).finally(() => {
  //     setLoading(false);
  //   });
  // };
  //
  // return { response, loading, error, reFetch };
  //
  // return null;
}

export default useFetch;
