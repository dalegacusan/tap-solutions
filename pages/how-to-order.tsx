// pages/HowToOrder.tsx
import React from 'react';
import Head from 'next/head';
import { Typography, Grid, Box } from '@mui/material';
import Footer from '../components/footer';
import Header from '../components/page-header';
import Menu from '../components/page-menu';
import Content from '../components/page-content';
import Slideshow from '../components/slideshow';

export const InfoBox = ({
  imageSrc,
  description,
  title,
  backgroundColor,
  textColor,
}: {
  imageSrc: string;
  description: string;
  title?: string;
  backgroundColor?: string;
  textColor?: string;
}) => (
  <Box
    sx={{
      textAlign: 'center',
      padding: 3,
      backgroundColor: backgroundColor ? backgroundColor : 'white',
      borderRadius: 2,
      boxShadow: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      height: '80%',
      margin: 1,
    }}
  >
    <Box
      sx={{
        flex: '0 1 auto',
      }}
    >
      <img
        src={imageSrc}
        alt={title}
        style={{
          width: '100%',
          height: 'auto',
          maxWidth: '200px',
          objectFit: 'cover',
          borderRadius: '8px',
        }}
      />
    </Box>
    <Box
      sx={{
        flex: '0 1 auto',
        marginTop: 1,
      }}
    >
      {title && (
        <Typography
          variant='h6'
          style={{ color: textColor ? textColor : 'black' }}
          mb={2}
          mt={2}
          fontWeight={600}
        >
          {title}
        </Typography>
      )}
      <Typography
        variant='body1'
        style={{ color: textColor ? textColor : 'black' }}
        mt={title ? 0 : 2}
      >
        {description}
      </Typography>
    </Box>
  </Box>
);

const HowToOrder = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Head>
      <title>Tap Technologies - How to Order</title>
      <link rel='icon' href='/images/logo.png' />
      <meta name='title' content='Tap Technologies - How to Order' />
      <meta
        name='description'
        content='Learn how to order your eco-friendly business card from Tap Technologies.'
      />
      <meta
        name='keywords'
        content='how to order, taptech, eco-friendly business card'
      />
      <meta name='robots' content='index, follow' />
      <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
      <meta name='language' content='English' />
      <meta property='og:type' content='website' />
      <meta property='og:url' content='https://taptech.ph/how-to-order' />
      <meta property='og:title' content='How to Order' />
      <meta
        property='og:description'
        content='Learn how to order your eco-friendly business card from Tap Technologies.'
      />
      <meta property='og:image' content='/images/how-to-order.jpg' />
      <meta property='twitter:card' content='summary_large_image' />
      <meta property='twitter:url' content='https://taptech.ph/how-to-order' />
      <meta property='twitter:title' content='How to Order' />
      <meta
        property='twitter:description'
        content='Learn how to order your eco-friendly business card from Tap Technologies.'
      />
      <meta property='twitter:image' content='/images/how-to-order.jpg' />
    </Head>

    <Header />
    <Menu />
    <Content>
        {/* Right Column */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              overflow: 'hidden',
            }}
          >
            <img
              src='/images/how-to-order/how-to-order.png'
              alt='How to Order'
              style={{
                width: '100%',
                height: 'auto',
                maxWidth: '90%',
                objectFit: 'cover',
              }}
            />
          </Box>
        

      {/* Additional Rows */}
      <Grid container spacing={4} sx={{ marginTop: 4 }}>
        {/* First Row with 4 Boxes */}
        <Grid item xs={12} sm={6} md={3}>
          <InfoBox
            imageSrc='/images/how-to-order/customize.png'
            description='Select a design and personalize your NFC business card'
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <InfoBox
            imageSrc='/images/how-to-order/pay.png'
            description='Complete your payment'
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <InfoBox
            imageSrc='/images/how-to-order/production.png'
            description='We’ll print and program your NFC card'
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <InfoBox
            imageSrc='/images/how-to-order/deliver.png'
            description='Your card is shipped via Grab, Lalamove, or LBC'
          />
        </Grid>
      </Grid>

      <Grid container spacing={4} sx={{ marginTop: 4 }}>
        {/* Second Row with 3 Boxes */}
        <Grid item xs={12} sm={4}>
          <InfoBox
            imageSrc='/images/how-to-order/edit.png'
            description='Edit your profile anytime through your Tap Technologies account'
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InfoBox
            imageSrc='/images/how-to-order/tap.png'
            description='Tap your NFC Card on the phone'
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InfoBox
            imageSrc='/images/how-to-order/share.png'
            description='Share your info and enjoy effortless networking!'
          />
        </Grid>
      </Grid>

      {/* "OUR DESIGNS" Header and Slideshow */}
      <Box sx={{ textAlign: 'center', marginTop: 12 }}>
        <Typography variant='h4' sx={{ marginBottom: '80px', fontWeight: 600 }}>
          OUR DESIGNS
        </Typography>
        <Box sx={{ width: '100%' }}>
          <Slideshow
            slides={[
              '/images/banner.png',
              '/images/banner2.png',
              '/images/banner3.jpg',
            ]}
          />
        </Box>
      </Box>
    </Content>
    <Footer />
  </Box>
);

export default HowToOrder;
