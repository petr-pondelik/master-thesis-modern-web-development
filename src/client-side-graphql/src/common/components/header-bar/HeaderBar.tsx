import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { AppBar } from '@mui/material';
import { HeaderArrowBack } from './ArrowBack';
import CustomLink from '../CustomLink';
import { CSSProperties } from 'react';
import { SessionControl } from './SessionControl';
import MenuDrawer from '../drawer-menu/MenuDrawer';
import { useLocation } from 'react-router-dom';

const homeLinkStyle: CSSProperties = {
  margin: '1rem',
  textDecoration: 'none',
  color: 'white',
};

export const HeaderBar = () => {

  const location = useLocation();
  const displayArrow = !location.pathname.match(/^(\/|\/stories|\/users\/\d\/stories|\/users\/\d\/reading-lists)$/);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          {displayArrow ? <HeaderArrowBack /> : <MenuDrawer />}
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