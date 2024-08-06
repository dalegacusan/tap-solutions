import Head from 'next/head';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {
  Avatar,
  Grid,
  ImageList,
  ImageListItem,
  Box,
  CardContent,
  ListItem,
  ListItemIcon,
  ListItemText,
  ImageListItemBar,
  ListItemButton,
  Typography,
  Button,
} from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import InfoIcon from '@mui/icons-material/Info';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import BusinessIcon from '@mui/icons-material/Business';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { User } from '../../interfaces/user.interface';
import getDocument from '../../firestore/getDocument';

export const iconMapping: Record<string, React.ReactNode> = {
  '<InfoIcon />': <InfoIcon />,
  '<CallIcon />': <CallIcon />,
  '<EmailIcon />': <EmailIcon />,
  '<XIcon />': <XIcon />,
  '<FacebookIcon />': <FacebookIcon />,
  '<InstagramIcon />': <InstagramIcon />,
};

const StyledListItemButtonWithHover = styled(ListItemButton)`
  ${({ theme }) => `
  transition: ${theme.transitions.create(['transform'], {
    duration: theme.transitions.duration.standard,
  })};
  &:hover {
    transform: scale(1.05);
  }
  `}
`;

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isRetrievingUser, setIsRetrievingUser] = useState<boolean>(true);
  const [isErrorRetrievingUser, setIsErrorRetrievingUser] = useState<
    string | null
  >(null);

  async function getUserDocument() {
    const { result, error } = await getDocument(
      'users',
      router.query.username as string
    );

    if (error) {
      setIsErrorRetrievingUser(error);
    } else {
      setUser(result as User);
    }

    setIsRetrievingUser(false);
  }

  useEffect(() => {
    getUserDocument();
  }, []);

  if (isRetrievingUser) return <p>Loading...</p>;
  if (isErrorRetrievingUser) return <p>Error: {isErrorRetrievingUser}</p>;

  return (
    <div>
      <Head>
        <title>
          {user.firstName} {user.lastName}
        </title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <div
          style={{
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundImage: "url('/images/banner.png')",
          }}
          className='header-banner'
        ></div>
        <div className='header-banner-divider'></div>
        <Grid
          container
          spacing={0}
          alignItems='center'
          justifyContent='center'
          sx={{ minHeight: '100vh' }}
        >
          <Grid item lg={4} md={6} xs={12}>
            <Box>
              <CardContent className='card-main'>
                {/* Header */}

                <Grid
                  container
                  spacing={0}
                  direction='column'
                  alignItems='center'
                  justifyContent='center'
                  mt={4}
                >
                  <Grid item xs={3}>
                    <Avatar
                      alt={`${user.firstName} ${user.lastName}`}
                      src='https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg'
                      sx={{ width: 120, height: 120, marginBottom: '-50px' }}
                    />
                  </Grid>
                </Grid>

                {/* Body */}
                <Box
                  className='card-secondary'
                  p={2}
                  style={{ borderRadius: '5px' }}
                >
                  <Typography
                    variant='h4'
                    mt={7}
                    mb={1}
                    style={{ textAlign: 'center', fontWeight: 'bold' }}
                  >
                    {user.firstName} {user.lastName}
                  </Typography>

                  <Typography variant='body2' style={{ textAlign: 'center' }}>
                    {user.job.title}, {user.job.company}
                  </Typography>

                  <Box style={{ marginTop: '160px' }}>
                    {/* Contact Information */}
                    <nav>
                      {user.contactInformation.map((item) => {
                        if (item.identifier === 'emailAddress') {
                          return (
                            <>
                              {item.label && (
                                <Typography mt={4}>{item.label}</Typography>
                              )}
                              <a
                                href={`mailto:${item.value}`}
                                style={{
                                  textDecoration: 'none',
                                  color: 'inherit',
                                }}
                              >
                                <StyledListItemButtonWithHover
                                  sx={{
                                    margin: '8px 0px',
                                    boxShadow: 1,
                                    borderRadius: '6px',
                                  }}
                                  className='card-socials'
                                >
                                  <ListItemIcon>
                                    {iconMapping[item.icon]}
                                  </ListItemIcon>
                                  <ListItemText primary={item.value} />
                                </StyledListItemButtonWithHover>
                              </a>
                            </>
                          );
                        } else if (item.identifier === 'phoneNumber') {
                          return (
                            <>
                              {item.label && (
                                <Typography mt={4}>{item.label}</Typography>
                              )}

                              <a
                                href={`tel:${item.value}`}
                                style={{
                                  textDecoration: 'none',
                                  color: 'inherit',
                                }}
                              >
                                <StyledListItemButtonWithHover
                                  sx={{
                                    margin: '8px 0px',
                                    boxShadow: 1,
                                    borderRadius: '6px',
                                  }}
                                  className='card-socials'
                                >
                                  <ListItemIcon>
                                    {iconMapping[item.icon]}
                                  </ListItemIcon>
                                  <ListItemText primary={item.value} />
                                </StyledListItemButtonWithHover>
                              </a>
                            </>
                          );
                        } else {
                          return (
                            <>
                              {item.label && (
                                <Typography mt={4}>{item.label}</Typography>
                              )}

                              <ListItem
                                sx={{
                                  margin: '8px 0px',
                                  boxShadow: 1,
                                  borderRadius: '6px',
                                }}
                                className='card-socials'
                              >
                                <ListItemIcon>
                                  {iconMapping[item.icon]}
                                </ListItemIcon>
                                <ListItemText primary={item.value} />
                              </ListItem>
                            </>
                          );
                        }
                      })}
                    </nav>
                  </Box>

                  {/* Social Media */}
                  <Box>
                    <Typography mt={4}>Socials</Typography>

                    <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                      {user.socialMedia.map((item) => {
                        if (item.link) {
                          return (
                            <Grid item xs={6}>
                              <a
                                href={item.link}
                                style={{
                                  textDecoration: 'none',
                                  color: 'inherit',
                                }}
                                target='_blank'
                              >
                                <StyledListItemButtonWithHover
                                  sx={{
                                    margin: '8px 0px',
                                    boxShadow: 1,
                                    borderRadius: '6px',
                                  }}
                                  className='card-socials'
                                >
                                  <ListItemIcon>
                                    {iconMapping[item.icon]}
                                  </ListItemIcon>
                                  <ListItemText primary={item.value} />
                                </StyledListItemButtonWithHover>
                              </a>
                            </Grid>
                          );
                        } else {
                          return (
                            <Grid item xs={6}>
                              <ListItem
                                sx={{
                                  margin: '8px 0px',
                                  boxShadow: 1,
                                  borderRadius: '6px',
                                }}
                                className='card-socials'
                              >
                                <ListItemIcon>
                                  {iconMapping[item.icon]}
                                </ListItemIcon>
                                <ListItemText primary={item.value} />
                              </ListItem>
                            </Grid>
                          );
                        }
                      })}
                    </Grid>
                  </Box>

                  {/* Address */}
                  <Box>
                    <Typography mt={4}>Address</Typography>

                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        user.address
                      )}`}
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                      }}
                      target='_blank'
                    >
                      <StyledListItemButtonWithHover
                        sx={{
                          margin: '8px 0px',
                          boxShadow: 1,
                          borderRadius: '6px',
                        }}
                        className='card-socials'
                      >
                        <ListItemIcon>
                          <BusinessIcon />
                        </ListItemIcon>
                        <ListItemText primary={user.address} />
                      </StyledListItemButtonWithHover>
                    </a>
                  </Box>

                  {/* Portfolio */}
                  <Box>
                    <Typography mt={4}>Portfolio</Typography>

                    <ImageList sx={{ height: 450 }}>
                      {user.photos.map((item) => (
                        <ImageListItem key={item.img}>
                          <img
                            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            src={`${item.img}?w=248&fit=crop&auto=format`}
                            alt={item.title}
                            loading='lazy'
                          />
                          <ImageListItemBar
                            title={item.title}
                            subtitle={item.description}
                          />
                        </ImageListItem>
                      ))}
                    </ImageList>
                  </Box>

                  {/* Save to Contact Button */}
                  <Box mt={5}>
                    <Button
                      fullWidth
                      size='small'
                      variant='contained'
                      style={{ backgroundColor: '#FF914D' }}
                    >
                      Save to Contact
                    </Button>
                  </Box>

                  {/* Powered by */}
                  <Box
                    mt={8}
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                  >
                    <Box display='flex' alignItems='center'>
                      <Box mr={2}>
                        <Image
                          src='/images/logo.png'
                          width={30}
                          height={30}
                          alt='logo'
                        />
                      </Box>
                      <Box fontSize='14px'>
                        <Typography variant='caption'>
                          Powered by Tap Solutions PH
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* Call to action text */}
                  <Box
                    mt={2}
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                  >
                    <ListItem
                      sx={{
                        padding: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <a
                        href=''
                        style={{ color: 'red', textDecoration: 'none' }}
                      >
                        <ListItemText
                          primary='Apply for a card today!'
                          primaryTypographyProps={{
                            variant: 'caption',
                            textAlign: 'center',
                          }}
                        />
                      </a>
                    </ListItem>
                  </Box>
                </Box>
              </CardContent>
            </Box>
          </Grid>
        </Grid>
      </main>
    </div>
  );
}
