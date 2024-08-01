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
} from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import InfoIcon from '@mui/icons-material/Info';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import BusinessIcon from '@mui/icons-material/Business';
import { styled } from '@mui/material/styles';

const StyledListItemButton = styled(ListItemButton)`
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
  const portfolio = {
    username: 'michaeljordan',
    firstName: 'Michael',
    lastName: 'Jordan',
    address: '',
    job: {
      title: 'Software Developer',
      company: 'Google',
    },
    address: 'Blk. 3, Lot 8 & 12, St. Benevolent Street, Quezon City, Manila',
    contactInformation: [
      {
        icon: <InfoIcon />,
        category: 'contactInformation',
        identifier: 'aboutMe',
        value:
          'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
      },
      {
        icon: <CallIcon />,
        category: 'contactInformation',
        identifier: 'phoneNumber',
        label: 'Phone Number',
        value: '094789920222',
      },
      {
        icon: <EmailIcon />,
        category: 'contactInformation',
        identifier: 'emailAddress',
        label: 'Email Address',
        value: 'michael.jordan@gmail.com',
      },
    ],
    socialMedia: [
      {
        icon: <XIcon />,
        category: 'socialMedia',
        identifier: 'twitter',
        value: '@michaeljordan',
        link: 'https://x.com',
      },
      {
        icon: <FacebookIcon />,
        category: 'socialMedia',
        identifier: 'facebook',
        value: '@michaeljordan',
        link: 'https://www.facebook.com/',
      },
      {
        icon: <InstagramIcon />,
        category: 'socialMedia',
        identifier: 'instagram',
        value: '@michaeljordan',
        link: 'https://www.instagram.com/',
      },
    ],
    photos: [
      {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
        description: 'At vero eos et accusamus',
        rows: 2,
        cols: 2,
        featured: true,
      },
      {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
      },
      {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
        description:
          'Et iusto odio dignissimos ducimus qui blanditiis praesentium',
      },
      {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
        description: 'Voluptatum deleniti atque corrupti',
        cols: 2,
      },
      {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
        description: 'Similique sunt',
        cols: 2,
      },
      {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey',
        description: 'Maxime placeat facere possimus',
        rows: 2,
        cols: 2,
        featured: true,
      },
      {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        title: 'Basketball',
      },
      {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        title: 'Fern',
        description: 'Tenetur a sapiente delectus',
      },
      {
        img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
        title: 'Mushrooms',
        rows: 2,
        cols: 2,
      },
    ],
  };

  return (
    <div>
      <Head>
        <title>
          {portfolio.firstName} {portfolio.lastName}
        </title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <div
          style={{
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundImage:
              "url('https://marketplace.canva.com/EAFOWEsiLHs/1/0/1600w/canva-beige-minimalist-book-shelf-home-staging-zoom-virtual-background-yx3Jh8_clqA.jpg')",
          }}
          className='header-banner'
        ></div>
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
                      alt={`${portfolio.firstName} ${portfolio.lastName}`}
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
                    variant='h5'
                    mt={7}
                    mb={1}
                    style={{ textAlign: 'center', fontWeight: 'bold' }}
                  >
                    {portfolio.firstName} {portfolio.lastName}
                  </Typography>

                  <Typography variant='body2' style={{ textAlign: 'center' }}>
                    {portfolio.job.title}, {portfolio.job.company}
                  </Typography>

                  <Box mt={4}>
                    {/* Contact Information */}
                    <nav>
                      {portfolio.contactInformation.map((item) => {
                        if (item.identifier === 'emailAddress') {
                          return (
                            <>
                              {item.label && (
                                <Typography>{item.label}</Typography>
                              )}
                              <a
                                href={`mailto:${item.link}`}
                                style={{
                                  textDecoration: 'none',
                                  color: 'inherit',
                                }}
                              >
                                <StyledListItemButton
                                  sx={{
                                    margin: '8px 0px',
                                    boxShadow: 1,
                                    borderRadius: '6px',
                                  }}
                                  className='card-socials'
                                >
                                  <ListItemIcon>{item.icon}</ListItemIcon>
                                  <ListItemText primary={item.value} />
                                </StyledListItemButton>
                              </a>
                            </>
                          );
                        } else if (item.identifier === 'phoneNumber') {
                          return (
                            <>
                              {item.label && (
                                <Typography>{item.label}</Typography>
                              )}

                              <a
                                href={`tel:${item.value}`}
                                style={{
                                  textDecoration: 'none',
                                  color: 'inherit',
                                }}
                              >
                                <StyledListItemButton
                                  sx={{
                                    margin: '8px 0px',
                                    boxShadow: 1,
                                    borderRadius: '6px',
                                  }}
                                  className='card-socials'
                                >
                                  <ListItemIcon>{item.icon}</ListItemIcon>
                                  <ListItemText primary={item.value} />
                                </StyledListItemButton>
                              </a>
                            </>
                          );
                        } else {
                          if (item.link) {
                            return (
                              <>
                                {item.label && (
                                  <Typography>{item.label}</Typography>
                                )}

                                <a
                                  href={item.link}
                                  style={{
                                    textDecoration: 'none',
                                    color: 'inherit',
                                  }}
                                  target='_blank'
                                >
                                  <StyledListItemButton
                                    sx={{
                                      margin: '8px 0px',
                                      boxShadow: 1,
                                      borderRadius: '6px',
                                    }}
                                    className='card-socials'
                                  >
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.value} />
                                  </StyledListItemButton>
                                </a>
                              </>
                            );
                          } else {
                            return (
                              <>
                                {item.label && (
                                  <Typography>{item.label}</Typography>
                                )}

                                <ListItem
                                  sx={{
                                    margin: '8px 0px',
                                    boxShadow: 1,
                                    borderRadius: '6px',
                                  }}
                                  className='card-socials'
                                >
                                  <ListItemIcon>{item.icon}</ListItemIcon>
                                  <ListItemText primary={item.value} />
                                </ListItem>
                              </>
                            );
                          }
                        }
                      })}
                    </nav>
                  </Box>

                  {/* Social Media */}
                  <Box>
                    <Typography>Socials</Typography>

                    <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                      {portfolio.socialMedia.map((item) => {
                        if (item.link) {
                          return (
                            <Grid item xs={6}>
                              {item.label && (
                                <Typography>{item.label}</Typography>
                              )}

                              <a
                                href={item.link}
                                style={{
                                  textDecoration: 'none',
                                  color: 'inherit',
                                }}
                                target='_blank'
                              >
                                <StyledListItemButton
                                  sx={{
                                    margin: '8px 0px',
                                    boxShadow: 1,
                                    borderRadius: '6px',
                                  }}
                                  className='card-socials'
                                >
                                  <ListItemIcon>{item.icon}</ListItemIcon>
                                  <ListItemText primary={item.value} />
                                </StyledListItemButton>
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
                                <ListItemIcon>{item.icon}</ListItemIcon>
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
                    <Typography>Address</Typography>

                    <ListItem
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
                      <ListItemText primary={portfolio.address} />
                    </ListItem>
                  </Box>

                  {/* Portfolio */}
                  <Box>
                    <Typography>Portfolio</Typography>

                    <ImageList sx={{ height: 450 }}>
                      {portfolio.photos.map((item) => (
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
                </Box>
              </CardContent>
            </Box>
          </Grid>
        </Grid>
      </main>
    </div>
  );
}
