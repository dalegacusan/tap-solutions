import React from 'react';
import Head from 'next/head';
import { Box, styled, Typography, Link as MuiLink, Grid } from '@mui/material';
import Header from '../components/page-header';
import Content from '../components/page-content';
import Footer from '../components/footer';
import Menu from '../components/page-menu';
import Image from 'next/image';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';

const ContactUsHeader = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 600,
}));

const AboutUs = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Head>
      <title>Tap Technologies - About Us</title>
      <link rel='icon' href='/images/logo.png' />
      <meta name='title' content='Tap Technologies - About Us' />
      <meta
        name='description'
        content='Revolutionize the way you share your business and contact information by using an environmentally friendly alternative business card'
      />
      <meta name='keywords' content='taptech, taptechnologies' />
      <meta name='robots' content='index, follow' />
      <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
      <meta name='language' content='English' />
      <meta property='og:type' content='website' />
      <meta property='og:url' content='https://taptech.ph/' />
      <meta property='og:title' content='Tap Technologies' />
      <meta
        property='og:description'
        content='Revolutionize the way you share your business and contact information by using an environmentally friendly alternative business card'
      />
      <meta property='og:image' content='/images/banner3.jpg' />
      <meta property='twitter:card' content='summary_large_image' />
      <meta property='twitter:url' content='https://taptech.ph/' />
      <meta property='twitter:title' content='Tap Technologies' />
      <meta
        property='twitter:description'
        content='Revolutionize the way you share your business and contact information by using an environmentally friendly alternative business card'
      />
      <meta property='twitter:image' content='/images/banner3.jpg' />
    </Head>

    <Header />
    <Menu />
    <Content>
      <ContactUsHeader variant='h4' sx={{ marginBottom: '30px' }}>
        About Us!
      </ContactUsHeader>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <img
              src='/images/tap_card.png'
              alt='Tap Card'
              style={{
                width: '62%',
                maxWidth: '600px',
                height: 'auto',
                marginTop: '0',
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Content>
    <Footer />
  </Box>
);

export default AboutUs;