import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Typography } from '@mui/material';
import { useJwtStore } from '../../../store';
import CustomLink from '../CustomLink';
import { findLink } from '../../../api';
import { CSSProperties } from 'react';

const ItemLinkStyle: CSSProperties = {
  color: 'rgba(0, 0, 0, 0.87)',
};

export default function MenuDrawer() {

  const [state, setState] = React.useState({ opened: false });

  const jwt = useJwtStore(state => state.jwt);

  if (!jwt) {
    return null;
  }

  const storiesLink = findLink(jwt._links, 'stories');
  const readingListsLink = findLink(jwt._links, 'reading-lists');

  if (!storiesLink || !readingListsLink) {
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
      sx={{ width: 250 }}
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
        <CustomLink to={storiesLink.href} customStyles={ItemLinkStyle}>
          <ListItem button>
            <ListItemText primary={'My Stories'} />
          </ListItem>
        </CustomLink>
        <CustomLink to={readingListsLink.href} customStyles={ItemLinkStyle}>
          <ListItem button>
            <ListItemText primary={'My Reading Lists'} />
          </ListItem>
        </CustomLink>
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton
        size='large'
        edge='start'
        color='inherit'
        aria-label='menu'
        sx={{ mr: 2 }}
        onClick={toggleDrawer(true)}
      >
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