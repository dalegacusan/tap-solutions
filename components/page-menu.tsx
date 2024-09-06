// components/Menu.js
import React from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  styled,
  useMediaQuery,
  useTheme,
  Link,
} from '@mui/material';

const MenuButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  textTransform: 'none',
  margin: theme.spacing(0.5),
  whiteSpace: 'nowrap',
  '&:hover': {
    backgroundColor: theme.palette.grey[700],
  },
}));

const Menu = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar position='static' sx={{ backgroundColor: '#282828' }}>
      <Toolbar>
        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'center',
            width: '100%',
            alignItems: 'center',
          }}
        >
          <Link href='/'>
            <MenuButton>Home</MenuButton>
          </Link>

          <Link href='/how-to-order'>
            <MenuButton>How to Order</MenuButton>
          </Link>

          <Link href='/contact-us'>
            <MenuButton>Contact Us</MenuButton>
          </Link>

          <MenuButton>About Us</MenuButton>
          <MenuButton>Login</MenuButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Menu;
