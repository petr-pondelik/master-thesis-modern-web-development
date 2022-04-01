import { Container } from '@mui/material';
import { CSSProperties } from 'react';

type PageContainerProps = {
  children: JSX.Element | JSX.Element[] | string,
  style?: CSSProperties
}

export const PageContainer = (props: PageContainerProps) => {
  return <Container style={ {...{ padding: '2rem 0', width: '90%' }, ...props.style} }>
    {props.children}
  </Container>;
};

export default PageContainer;