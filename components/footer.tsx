// components/Footer.js
import React from 'react';
import { Box, Typography, styled } from '@mui/material';

const FooterContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: 'black',
  color: 'white',
  padding: theme.spacing(2),
  position: 'fixed',
  bottom: 0,
  width: '100%',
  boxSizing: 'border-box',
  height: '60px',
}));

const Footer = () => (
  <FooterContainer>
    <Typography
      variant='body2'
      sx={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}
    >
      Tap Technologies PH by Tap and Print Technologies Corporation
    </Typography>
    <Typography
      variant='body2'
      sx={{
        flex: 1,
        textAlign: 'right',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
    >
      Social Media Links
    </Typography>
  </FooterContainer>
);

export default Footer;
