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
  title,
  description,
  backgroundColor,
  textColor
}: {
  imageSrc: string;
  title: string;
  description: string;
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
      <Typography variant='body2' style={{color: textColor ? textColor : 'black'}}>{description}</Typography>
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
      <Grid container spacing={4}>
        {/* Left Column */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              padding: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant='h4'
              sx={{ marginBottom: '20px', fontWeight: 600 }}
            >
              How to Order
            </Typography>
            <Typography variant='body1' sx={{ marginBottom: '20px' }}>
              Follow these simple steps to place your order:
            </Typography>
            <Typography variant='body1'>
              1. Select a design and personalize your NFC business card
            </Typography>
            <Typography variant='body1'>2. Pay the total amount</Typography>
            <Typography variant='body1'>
              3. Print and programming of your NFC Card
            </Typography>
            <Typography variant='body1'>
              4. Shipping of your NFC Card through Grab, Lalamove or LBC
            </Typography>
            <Typography variant='body1'>
              5. Edit your profile through your Tap Technology account
            </Typography>
            <Typography variant='body1'>
              6. Tap your NFC Card on the phone
            </Typography>
            <Typography variant='body1'>
              7. Share your contact information and experience networking to a
              whole new level
            </Typography>
          </Box>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={6}>
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
                maxWidth: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>
        </Grid>
      </Grid>

      {/* Additional Rows */}
      <Grid container spacing={4} sx={{ marginTop: 4 }}>
        {/* First Row with 4 Boxes */}
        <Grid item xs={12} sm={6} md={3}>
          <InfoBox
            imageSrc='/images/how-to-order/customize.png'
            title='Select a design and personalize your NFC business card'
            description='Select a design and personalize your NFC business card'
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <InfoBox
            imageSrc='/images/how-to-order/pay.png'
            title='Pay the total amount'
            description='Pay the total amount'
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <InfoBox
            imageSrc='/images/how-to-order/production.png'
            title='Print and programming of your NFC Card'
            description='Print and programming of your NFC Card'
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <InfoBox
            imageSrc='/images/how-to-order/deliver.png'
            title='Shipping of your NFC Card through Grab, Lalamove or LBC'
            description='Shipping of your NFC Card through Grab, Lalamove or LBC'
          />
        </Grid>
      </Grid>

      <Grid container spacing={4} sx={{ marginTop: 4 }}>
        {/* Second Row with 3 Boxes */}
        <Grid item xs={12} sm={4}>
          <InfoBox
            imageSrc='/images/how-to-order/edit.png'
            title='Edit your profile through your Tap Technology account'
            description='Edit your profile through your Tap Technology account'
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InfoBox
            imageSrc='/images/how-to-order/tap.png'
            title='Tap your NFC Card on the phone'
            description='Tap your NFC Card on the phone'
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InfoBox
            imageSrc='/images/how-to-order/share.png'
            title='Share your contact information and experience networking to a whole new level'
            description='Share your contact information and experience networking to a whole new level'
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
