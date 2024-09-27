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
        About Tap Technologies
      </ContactUsHeader>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box>
            <Typography>At Tap Technologies, we’re revolutionizing the way people connect. By leveraging the power of NFC, our smart business cards allow you to share contact information, social media, portfolios, and more with just a single tap—no apps, no fuss. In an age where first impressions count, our sleek, customizable cards ensure you leave a lasting mark while embracing a touchless, eco-conscious future.</Typography>
            <br/>
            <Typography>Our journey began with a clear vision: to eliminate the outdated practice of paper business cards and replace it with a modern, seamless, and sustainable solution. Whether you’re an entrepreneur, freelancer, or a corporate team, our NFC cards redefine networking—helping you exchange information with precision and efficiency.</Typography>
            <br/>
            <Typography>At Tap Technologies, innovation is at the heart of everything we do. We believe in empowering professionals to connect smarter, share effortlessly, and make every interaction meaningful. As we continue to grow, our mission remains simple: to lead the future of networking, one tap at a time.</Typography>
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
