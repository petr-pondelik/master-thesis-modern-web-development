import { Container } from '@mui/material';

type PageContainerProps = {
  children: JSX.Element | JSX.Element[]
}

export const PageContainer = (props: PageContainerProps) => {
  return <Container style={{ padding: '2rem 0', width: '90%' }}>
    {props.children}
  </Container>;
};

export default PageContainer;