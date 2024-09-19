import React, { useState } from 'react';
import Head from 'next/head';
import { Box, styled, Typography, Grid, TextField, Button, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Header from '../components/page-header';
import Content from '../components/page-content';
import Footer from '../components/footer';
import Menu from '../components/page-menu';
import axios from 'axios';
import getDocument from '../firestore/getDocument';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext'; // Import useAuth

const ContactUsHeader = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 600,
}));

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { setIsLoggedIn } = useAuth(); // Get setIsLoggedIn from context

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null); // Reset error state

    try {
      let { result: user, error: fetchError } = await getDocument('users', username);
      let isAdmin = false;

      if (!user) {
        const { result: adminUser, error: adminFetchError } = await getDocument('administrators', username);
        
        if (adminFetchError) {
          setError(adminFetchError);
          return;
        }

        if (adminUser) {
          user = adminUser;
          isAdmin = true;
        } else {
          setError('Document not found.');
          return;
        }
      }

      const { data } = await axios.post('/api/verify-password', {
        enteredPassword: password,
        accountPassword: user.password,
      });

      if (data.success) {
        console.log('Login successful');
        setIsLoggedIn(true); // Set login state in context
        localStorage.setItem('isLoggedIn', 'true'); // Set login status in local storage
        
        if (isAdmin) {
          router.push('/dashboard');
        } else {
          router.push(`/${username}/edit`);
        }
      } else {
        setError('Incorrect password. Please try again.');
      }
    } catch (err) {
      const errorMessage =
        (err as any).response?.data?.error || 'Error verifying credentials. Please try again.';
      setError(errorMessage);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Head>
        <title>Tap Technologies - Login</title>
        <link rel='icon' href='/images/logo.png' />
        <meta name='title' content='Tap Technologies - Login' />
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
          Login
        </ContactUsHeader>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} mt={10} mb={10}>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column' }}>
              <TextField
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{ marginBottom: 2 }}
                required
              />
              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ marginBottom: 2 }}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {error && (
                <Typography color='error' sx={{ mt: 2, mb: 4 }}>
                  {error}
                </Typography>
              )}
              <Button variant="contained" color="primary" type="submit" style={{ backgroundColor: '#FF914D' }}>
                Submit
              </Button>
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
};

export default Login;
