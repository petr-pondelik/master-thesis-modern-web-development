import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { AppBar } from '@mui/material';
import { useGoBack } from '../../../hooks';
import HeaderArrowBack from './ArrowBack';
import CustomLink from '../CustomLink';
import { CSSProperties } from 'react';
import { SessionControl } from './SessionControl';
import MenuDrawer from '../drawer-menu/MenuDrawer';

const homeLinkStyle: CSSProperties = {
  margin: '1rem',
  textDecoration: 'none',
  color: 'white',
};

export const HeaderBar = () => {

  const { displayArrow } = useGoBack();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          {displayArrow() ? <HeaderArrowBack /> : <MenuDrawer />}
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            <CustomLink to={'/'} customStyles={homeLinkStyle}>
              Storify
            </CustomLink>
          </Typography>
          <SessionControl />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default HeaderBar;