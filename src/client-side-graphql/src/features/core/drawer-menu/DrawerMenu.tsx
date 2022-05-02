import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Typography } from '@mui/material';
import { CSSProperties } from 'react';
import { Paths } from 'helpers';
import { useUserStore } from 'stores';
import { CustomLink } from 'features/core';

const ItemLinkStyle: CSSProperties = {
  color: 'rgba(0, 0, 0, 0.87)',
};

export default function DrawerMenu() {

  const [state, setState] = React.useState({ opened: false });
  const user = useUserStore(state => state.user);

  if (!user) {
    return null;
  }

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setState({ ...state, ['opened']: open });
  };

  const list = () => (
    <Box
      sx={{ width: 300 }}
      role='presentation'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem>
          <Typography variant={'h6'} width={'100%'} textAlign={'center'}>
            Storify
          </Typography>
        </ListItem>
        <Divider />
        <CustomLink to={'/'} customStyles={ItemLinkStyle}>
          <ListItem button>
            <ListItemText primary={'Home'} />
          </ListItem>
        </CustomLink>
        <CustomLink to={Paths.userStories(user.sub)} customStyles={ItemLinkStyle}>
          <ListItem button>
            <ListItemText primary={'My Stories'} />
          </ListItem>
        </CustomLink>
        <CustomLink to={Paths.userReadingLists(user.sub)} customStyles={ItemLinkStyle}>
          <ListItem button>
            <ListItemText primary={'My Reading Lists'} />
          </ListItem>
        </CustomLink>
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}
                  onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor={'left'}
        open={state.opened}
        onClose={toggleDrawer(false)}
      >
        {list()}
      </Drawer>
    </div>
  );
}
