import { gql, useMutation } from '@apollo/client';
import { AuthPayload, SignInContent } from '../graphql-typings';

const SIGN_IN_MUTATION = gql`
  mutation SignIn($content: SignInContent!) {
    signIn(content: $content) {
      access_token
    }
  }
`;

interface ISignInData {
  signIn: AuthPayload;
}

interface ISignInVars {
  content: SignInContent;
}

export function useSignInMutation(_variables: ISignInVars) {
  return useMutation<ISignInData, ISignInVars>(SIGN_IN_MUTATION, {
    variables: _variables,
  });
}
