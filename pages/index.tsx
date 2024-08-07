import { Grid, Typography } from '@mui/material';
import Head from 'next/head';

export default function HomePage() {
  return (
    <div>
      <Head>
        <title>Tap Solutions PH</title>
        <link rel='icon' href='/images/logo.png' />
      </Head>

      <div
        style={{
          backgroundImage: "url('/images/bg.png')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh', // Ensure the background covers the full height
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid container justifyContent='center' alignItems='center' style={{ textAlign: 'center' }}>
          <Grid item>
            <img src='/images/logo.png' alt='logo' style={{width: '10%'}}/>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
