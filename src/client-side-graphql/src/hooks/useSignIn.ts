import { useEffect } from 'react';
import { SignInContent } from '../graphql';
import { useSignInMutation } from '../graphql/mutations';

export const useSignIn = (call: boolean, dto: SignInContent) => {
  const [signIn, { data, error }] = useSignInMutation({ content: dto });

  useEffect(() => {
    if (call) {
      signIn();
    }
  }, [call]);

  if (error) {
    return { authorized: false, authPayload: undefined };
  }

  if (data?.signIn) {
    return { authorized: true, authPayload: data.signIn };
  }

  return { authorized: undefined, authPayload: undefined };
};
