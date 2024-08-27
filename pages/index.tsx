import { Grid, Typography } from '@mui/material';
import Head from 'next/head';

export default function HomePage() {
  return (
    <div>
      <Head>
        <title>Tap Technologies</title>
        <link rel='icon' href='/images/logo.png' />
        <meta name='title' content='Tap Technologies' />
        <meta
          name='description'
          content='Tap into the future and revolutionize the way you share your business and contact information by using an environmentally friendly alternative business card'
        />
        <meta name='keywords' content='taptech, taptechnologies' />
        <meta name='robots' content='index, follow' />
        <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
        <meta name='language' content='English' />
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
