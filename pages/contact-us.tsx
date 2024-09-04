import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  Button,
  Grid,
  styled,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';

// Custom styled components
const MenuButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  textTransform: 'none',
  margin: theme.spacing(0.5), // Reduce margin to decrease spacing between buttons
  whiteSpace: 'nowrap', // Prevent text from wrapping
  '&:hover': {
    backgroundColor: theme.palette.grey[700], // Darker shade for hover effect
  },
}));

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'white',
  padding: theme.spacing(2), // Add some padding for better spacing
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: theme.spacing(6),
}));

const ContactUsHeader = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 600,
}));

const ContactBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'black',
  color: 'white',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1),
  marginBottom: theme.spacing(1),
  height: '50px', // Adjust height as needed,
}));

const ContactIcon = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(4),
  marginLeft: theme.spacing(2),
}));

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
  boxSizing: 'border-box', // Ensure padding is included in the element's total width and height
  height: '60px', // Set a fixed height for the footer
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

const ContactUs = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen size is small

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Head>
        <title>Tap Technologies - Contact Us</title>
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

      {/* Header */}
      <HeaderContainer>
        <LogoContainer>
          <Image src='/images/logo.png' height={100} width={100} alt='logo' />
        </LogoContainer>
        <Typography
          variant={isMobile ? 'h6' : 'h5'}
          fontWeight={600}
          sx={{ textAlign: 'center', padding: '0 16px' }} // Add padding to avoid text touching edges
        >
          Make the switch and be remembered, order yours now!
        </Typography>
      </HeaderContainer>

      {/* Horizontal Menu */}
      <AppBar position='static' sx={{ backgroundColor: 'black' }}>
      <Toolbar>
        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row', // Stack buttons vertically on mobile
            justifyContent: 'center', // Center items horizontally
            width: '100%',
            alignItems: 'center', // Center items vertically
          }}
        >
          <MenuButton>Home</MenuButton>
          <MenuButton>How to Order</MenuButton>
          <MenuButton>Contact Us</MenuButton>
          <MenuButton>About Us</MenuButton>
          <MenuButton>Login</MenuButton>
        </Box>
      </Toolbar>
    </AppBar>

      {/* Content */}
      <Box
        sx={{
          flex: '1',
          backgroundColor: '#F6E9DB',
          paddingBottom: '60px',
          px: { xs: 2, sm: 4, md: 8, lg: 16 }, // Responsive horizontal padding
          py: { xs: 4, sm: 6, md: 8 }, // Responsive vertical padding
        }}
      >
        <ContactUsHeader variant='h4' sx={{marginBottom: '30px'}}>Contact Us!</ContactUsHeader>
        <Grid container spacing={2}>
          {/* Contact Boxes */}
          <Grid item xs={12} md={6}>
            <Box>
              <ContactBox>
                <ContactIcon>
                  <Image
                    src='/images/social/facebook.png'
                    height={30}
                    width={30}
                    alt='Facebook'
                  />
                </ContactIcon>
                <Typography>Tap Technologies</Typography>
              </ContactBox>
              <ContactBox>
                <ContactIcon>
                  <Image
                    src='/images/social/instagram.png'
                    height={30}
                    width={30}
                    alt='Instagram'
                  />
                </ContactIcon>
                <Typography>@taptechnologiesph</Typography>
              </ContactBox>
              <ContactBox>
                <ContactIcon>
                  <Image
                    src='/images/social/tiktok.png'
                    height={30}
                    width={30}
                    alt='TikTok'
                  />
                </ContactIcon>
                <Typography>@taptechnologiesph</Typography>
              </ContactBox>
              <ContactBox>
                <ContactIcon>
                  <EmailIcon />
                </ContactIcon>
                <Typography>taptechnologies24@gmail.com</Typography>
              </ContactBox>
              <ContactBox>
                <ContactIcon>
                  <CallIcon />
                </ContactIcon>
                <Typography>+639178600703</Typography>
              </ContactBox>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden', // Ensure image does not overflow container
              }}
            >
              <img
                src='/images/tap_card.png'
                alt='Tap Card'
                style={{
                  width: '70%', // Make the image responsive
                  maxWidth: '600px', // Set a maximum width
                  height: 'auto', // Maintain aspect ratio
                  marginTop: '0', // Adjust as needed
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default ContactUs;
