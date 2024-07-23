import Head from 'next/head';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {
  Avatar,
  Fab,
  Grid,
  ImageList,
  ImageListItem,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  ImageListItemBar,
  IconButton,
  ListItemButton,
  Typography,
  Divider,
} from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import InfoIcon from '@mui/icons-material/Info';
import ShareIcon from '@mui/icons-material/Share';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
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
    firstName: 'Michael',
    lastName: 'Jordan',
    job: {
      title: 'Software Developer',
      company: 'Google',
    },
    contact: [
      {
        icon: <CallIcon />,
        category: 'contactInformation',
        identifier: 'phoneNumber',
        value: '094789920222',
      },
      {
        icon: <EmailIcon />,
        category: 'contactInformation',
        identifier: 'emailAddress',
        value: 'michael.jordan@gmail.com',
      },
      {
        icon: <InfoIcon />,
        category: 'contactInformation',
        identifier: 'aboutMe',
        value:
          'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
      },
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
      {
        icon: <NoAccountsIcon />,
        category: 'websites',
        identifier: 'lazada',
        value: '@michaeljordan',
        link: 'http://localhost:3000/',
      },
      {
        icon: <NoAccountsIcon />,
        category: 'websites',
        identifier: 'shopee',
        value: '@michaeljordan',
        link: 'http://localhost:3000/',
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
                    {/* <Typography
                      variant='body1'
                      mt={3}
                      mb={1}
                      style={{ textAlign: 'center', fontWeight: 'bold' }}
                    >
                      Contact Information
                    </Typography>

                    <Divider /> */}

                    {/* <Fab color='primary' aria-label='add'>
                    <CallIcon />
                  </Fab>

                  <Fab color='primary' aria-label='add'>
                    <EmailIcon />
                  </Fab>

                  <Fab color='primary' aria-label='add'>
                    <ShareIcon />
                  </Fab> */}

                    <nav>
                      {portfolio.contact.map((item) => {
                        if (item.identifier === 'emailAddress') {
                          return (
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
                          );
                        } else {
                          if (item.link) {
                            return (
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
                            );
                          } else {
                            return (
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
                            );
                          }
                        }
                      })}
                    </nav>
                  </Box>

                  <Box mt={4}>
                    {/* <Typography
                      variant='body1'
                      mt={3}
                      mb={1}
                      style={{ textAlign: 'center', fontWeight: 'bold' }}
                    >
                      Check out my portfolio
                    </Typography>

                    <Divider /> */}

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
