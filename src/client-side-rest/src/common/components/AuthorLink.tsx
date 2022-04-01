import { Link } from 'react-router-dom';

type AuthorLinkProps = {
  children: JSX.Element | JSX.Element[],
  to: string
};

const AuthorLinkStyle = {
  textDecoration: 'none',
  color: '#1976d2',
};

export const AuthorLink = (props: AuthorLinkProps) => {
  return <Link style={AuthorLinkStyle} to={props.to}>
    {props.children}
  </Link>
}

export default AuthorLink;