import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useGoBack } from '../../../hooks';
import HeaderArrowBack from './ArrowBack';

const homeLinkStyle = {
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
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            {displayArrow() ? <HeaderArrowBack /> : <MenuIcon />}
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            <Link to={'/'} style={homeLinkStyle}>
              Storify
            </Link>
          </Typography>
          <Button color='inherit'>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default HeaderBar;