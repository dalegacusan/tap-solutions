import { Box, Grid, Typography } from '@mui/material';
import Head from 'next/head';
import Header from '../components/page-header';
import Menu from '../components/page-menu';
import Content from '../components/page-content';
import Footer from '../components/footer';
import Slideshow from '../components/slideshow';
import { InfoBox } from './how-to-order';

export default function HomePage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Head>
        <title>Tap Technologies</title>
        <link rel='icon' href='/images/logo.png' />
        <meta name='title' content='Tap Technologies' />
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
        <img
          src='/images/home-instructions.png'
          width='100%'
          style={{ marginBottom: '80px' }}
          alt="Home Instructions"
        />
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
              GIF / Video
            </Box>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={4} sx={{ marginTop: 4 }}>
              {/* First Row with 4 Boxes */}
              <Grid item xs={12} sm={6} md={3}>
                <InfoBox
                  imageSrc='/images/how-to-order/customize.png'
                  title='Share information easier'
                  description='Share information easier'
                  backgroundColor='#282828'
                  textColor='#ffffff'
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <InfoBox
                  imageSrc='/images/how-to-order/pay.png'
                  title='Reduce paper waste with a sustainable alternative'
                  description='Reduce paper waste with a sustainable alternative'
                  backgroundColor='#282828'
                  textColor='#ffffff'
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <InfoBox
                  imageSrc='/images/how-to-order/production.png'
                  title="Make your profile unique to your brand's identity"
                  description="Make your profile unique to your brand's identity"
                  backgroundColor='#282828'
                  textColor='#ffffff'
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <InfoBox
                  imageSrc='/images/how-to-order/deliver.png'
                  title='Share your digital business card using your custom link'
                  description='Share your digital business card using your custom link'
                  backgroundColor='#282828'
                  textColor='#ffffff'
                />
              </Grid>
            </Grid>

            <Grid container spacing={4} sx={{ marginTop: 4 }}>
              {/* Second Row with 4 Boxes */}
              <Grid item xs={12} sm={6} md={3}>
                <InfoBox
                  imageSrc='/images/how-to-order/deliver.png'
                  title='Update details anytime'
                  description='Update details anytime'
                  backgroundColor='#282828'
                  textColor='#ffffff'
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <InfoBox
                  imageSrc='/images/how-to-order/deliver.png'
                  title='Works on most smartphones, no app needed'
                  description='Works on most smartphones, no app needed'
                  backgroundColor='#282828'
                  textColor='#ffffff'
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <InfoBox
                  imageSrc='/images/how-to-order/deliver.png'
                  title='Share your digital business just by tapping the card on the phone'
                  description='Share your digital business just by tapping the card on the phone'
                  backgroundColor='#282828'
                  textColor='#ffffff'
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <InfoBox
                  imageSrc='/images/how-to-order/deliver.png'
                  title='Build connections and network with peace of mind'
                  description='Build connections and network with peace of mind'
                  backgroundColor='#282828'
                  textColor='#ffffff'
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* "OUR DESIGNS" Header and Slideshow */}
        <Box sx={{ textAlign: 'center', marginTop: 12 }}>
          <Typography
            variant='h4'
            sx={{ marginBottom: '80px', fontWeight: 600 }}
          >
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

        {/* "BRAND PARTNERS" Header and Images */}
        <Box sx={{ textAlign: 'center', marginTop: 12 }}>
          <Typography
            variant='h4'
            sx={{ marginBottom: '40px', fontWeight: 600 }}
          >
            BRAND PARTNERS
          </Typography>
          <Grid container spacing={4}>
            {/* Example Placeholder Images */}
            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  width: '100%',
                  height: '200px', // Set a fixed height for the images
                  backgroundColor: '#f0f0f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '8px',
                }}
              >
                <Typography variant='body2'>Partner 1</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  width: '100%',
                  height: '200px', // Set a fixed height for the images
                  backgroundColor: '#f0f0f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '8px',
                }}
              >
                <Typography variant='body2'>Partner 2</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  width: '100%',
                  height: '200px', // Set a fixed height for the images
                  backgroundColor: '#f0f0f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '8px',
                }}
              >
                <Typography variant='body2'>Partner 3</Typography>
              </Box>
            </Grid>
            {/* Add more placeholder images as needed */}
          </Grid>
        </Box>
      </Content>
      <Footer />
    </Box>
  );
}
