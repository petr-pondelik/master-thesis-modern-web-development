import { gql, useMutation } from '@apollo/client';
import { AuthPayload, SignInContent } from '../graphql-typings';

const SIGN_IN_MUTATION = gql`
  mutation SignIn($content: SignInContent!) {
    signIn(content: $content) {
      access_token
    }
  }
`;

export type SignInData = {
  signIn: AuthPayload;
};

type SignInVars = {
  content: SignInContent;
};

export function useSignInMutation(_variables: SignInVars, _onCompleted?: any) {
  return useMutation<SignInData, SignInVars>(SIGN_IN_MUTATION, {
    variables: _variables,
    onCompleted: _onCompleted,
  });
}
