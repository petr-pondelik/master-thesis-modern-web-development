import { Link } from 'react-router-dom';
import { CSSProperties } from 'react';

type CustomLinkProps = {
  children: any,
  to?: string,
  customStyles?: CSSProperties,
  state?: any
};

const DefaultStyles: CSSProperties = {
  textDecoration: 'none',
  color: '#1976d2',
};

export const CustomLink = (props: CustomLinkProps) => {
  const { children, to, customStyles, state } = props;
  return <Link style={{ ...DefaultStyles, ...customStyles }} to={to ?? '#'} state={state}>
    {children}
  </Link>;
};

export default CustomLink;