// components/Header.js
import React from 'react';
import { Box, Typography, useTheme, useMediaQuery, styled } from '@mui/material';
import Image from 'next/image';

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'white',
  padding: theme.spacing(2),
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: theme.spacing(6),
}));

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <HeaderContainer>
      <LogoContainer>
        <Image src='/images/logo.png' height={100} width={100} alt='logo' />
      </LogoContainer>
      <Typography
        variant={isMobile ? 'h6' : 'h5'}
        fontWeight={600}
        sx={{ textAlign: 'center', padding: '0 16px' }}
      >
        Make the switch and be remembered, order yours now!
      </Typography>
    </HeaderContainer>
  );
};

export default Header;
