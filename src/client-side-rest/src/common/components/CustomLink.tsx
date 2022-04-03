import { Link } from 'react-router-dom';
import { CSSProperties } from 'react';

type CustomLinkProps = {
  children: any,
  to: string,
  customStyles?: CSSProperties
};

const DefaultStyles: CSSProperties = {
  textDecoration: 'none',
  color: '#1976d2',
};

export const CustomLink = (props: CustomLinkProps) => {
  return <Link style={{...DefaultStyles, ...props.customStyles}} to={props.to} >
    {props.children}
  </Link>
}

export default CustomLink;