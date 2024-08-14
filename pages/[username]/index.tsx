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
  Dialog,
  IconButton,
} from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import InfoIcon from '@mui/icons-material/Info';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import BusinessIcon from '@mui/icons-material/Business';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { User } from '../../interfaces/user.interface';
import getDocument from '../../firestore/getDocument';
import CloseIcon from '@mui/icons-material/Close';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TikTokIcon from '../../components/icons/tiktok-icon';
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ViberIcon from '../../components/icons/viber-icon';
import LanguageIcon from '@mui/icons-material/Language';

const iconMapping = {
  twitter: <XIcon />,
  facebook: <FacebookIcon />,
  instagram: <InstagramIcon />,
  linkedIn: <LinkedInIcon />,
  youtube: <YouTubeIcon />,
  tiktok: <TikTokIcon color='rgba(0, 0, 0, 0.54)' />,
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
  const [openLightbox, setOpenLightbox] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  const handleImageClick = (imageUrl: string) => {
    setCurrentImage(imageUrl);
    setOpenLightbox(true);
  };

  const handleCloseLightbox = () => {
    setOpenLightbox(false);
    setCurrentImage(null);
  };

  const handleSaveToContact = () => {
    if (!user) return;

    // Construct the vCard data with the specified fields
    const vCardData =
      `BEGIN:VCARD\n` +
      `VERSION:3.0\n` +
      `FN:${user.firstName} ${user.lastName}\n` +
      `N:${user.lastName};${user.firstName};;;;\n` +
      `EMAIL:${user.emailAddress || ''}\n` +
      `TEL;TYPE=WORK:${user.phoneNumber || ''}\n` +
      `ORG:${user.company || ''}\n` +
      `TITLE:${user.jobTitle || ''}\n` +
      `${
        user.socialMediaLinks.facebook
          ? `URL;TYPE=FACEBOOK:${user.socialMediaLinks.facebook}\n`
          : ''
      }` +
      `${
        user.socialMediaLinks.twitter
          ? `URL;TYPE=TWITTER:${user.socialMediaLinks.twitter}\n`
          : ''
      }` +
      `${
        user.socialMediaLinks.instagram
          ? `URL;TYPE=INSTAGRAM:${user.socialMediaLinks.instagram}\n`
          : ''
      }` +
      `${
        user.socialMediaLinks.linkedIn
          ? `URL;TYPE=LINKEDIN:${user.socialMediaLinks.linkedIn}\n`
          : ''
      }` +
      `${
        user.socialMediaLinks.youtube
          ? `URL;TYPE=YOUTUBE:${user.socialMediaLinks.youtube}\n`
          : ''
      }` +
      `${
        user.socialMediaLinks.tiktok
          ? `URL;TYPE=TIKTOK:${user.socialMediaLinks.tiktok}\n`
          : ''
      }` +
      `NOTE:Created with tapsolutionsph.com\n` +
      `END:VCARD`;

    // Create a Blob with the vCard data
    const blob = new Blob([vCardData], { type: 'text/vcard' });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a temporary link element and trigger a click
    const link = document.createElement('a');
    link.href = url;
    link.download = `${user.firstName}_${user.lastName}.vcf`;

    // Append to the body to ensure it works in all browsers
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

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
    if (router.query.username) {
      getUserDocument();
    }
  }, [router.query.username]);

  useEffect(() => {
    if (isErrorRetrievingUser) {
      router.push('/'); // Redirect to the homepage
    }
  }, [isErrorRetrievingUser, router]);

  // Dynamically set the background style
  const backgroundStyle = user?.backgroundUrl
    ? {
        backgroundImage: `url('${user.backgroundUrl}')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }
    : {
        background:
          'linear-gradient(0deg, rgba(255, 238, 218, 1) 0%, rgba(255, 255, 255, 1) 38%, rgba(255, 255, 255, 1) 61%, rgba(203, 242, 238, 1) 100%)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      };

  if (isRetrievingUser || isErrorRetrievingUser) {
    return (
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        style={{ minHeight: '100vh', textAlign: 'center' }}
      >
        <Grid item>
          <Typography variant='h6'>
            {isErrorRetrievingUser && `Error: ${isErrorRetrievingUser}`}
          </Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <div>
      <Head>
        <title>
          {user.firstName} {user.lastName}
        </title>
        <link rel='icon' href='/images/logo.png' />
      </Head>

      <main style={backgroundStyle}>
        <div
          style={{
            backgroundImage: user?.bannerUrl
              ? `url('${user.bannerUrl}')`
              : `url('/images/banner.png')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
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
                      src={user.profilePictureUrl || '/images/logo.png'}
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

                  {user.company && (
                    <Typography
                      variant='h6'
                      style={{ textAlign: 'center', fontWeight: 'bold' }}
                    >
                      {user.company}
                    </Typography>
                  )}

                  {user.jobTitle && (
                    <Typography
                      variant='body2'
                      style={{ textAlign: 'center' }}
                      mt={1}
                    >
                      {user.jobTitle}
                    </Typography>
                  )}

                  <Box style={{ marginTop: '80px' }}>
                    {/* Contact Information */}

                    <nav>
                      {/* About Me */}
                      {user.aboutMe && (
                        <>
                          <Typography mt={4}>About Me</Typography>

                          <ListItem
                            sx={{
                              margin: '8px 0px',
                              boxShadow: 1,
                              borderRadius: '6px',
                            }}
                            className='card-socials'
                          >
                            <ListItemIcon>
                              <InfoIcon />
                            </ListItemIcon>
                            <ListItemText primary={user.aboutMe} />
                          </ListItem>
                        </>
                      )}

                      {/* Email Address */}
                      {user.emailAddress && (
                        <>
                          <Typography mt={4}>Email Address</Typography>
                          <a
                            href={`mailto:${user.emailAddress}`}
                            style={{ textDecoration: 'none', color: 'inherit' }}
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
                                <EmailIcon />
                              </ListItemIcon>
                              <ListItemText primary={user.emailAddress} />
                            </StyledListItemButtonWithHover>
                          </a>
                        </>
                      )}

                      {/* Phone Number */}
                      {user.phoneNumber && (
                        <>
                          <Typography mt={4}>Phone Number</Typography>
                          <a
                            href={`tel:${user.phoneNumber}`}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                          >
                            <StyledListItemButtonWithHover
                              sx={{
                                margin: '8px 0px',
                                boxShadow: 1,
                                borderRadius: '6px',
                                display: 'flex',
                                justifyContent: 'space-between', // Ensure content is spaced out
                                alignItems: 'center', // Center items vertically
                              }}
                              className='card-socials'
                            >
                              <ListItemIcon>
                                <CallIcon />
                              </ListItemIcon>
                              <ListItemText primary={user.phoneNumber} />
                              {/* Add the save icon button */}
                              <IconButton
                                edge='end'
                                onClick={handleSaveToContact}
                                sx={{ color: '#FF914D' }} // Adjust color as needed
                              >
                                <BookmarkIcon />
                              </IconButton>
                            </StyledListItemButtonWithHover>
                          </a>
                        </>
                      )}
                    </nav>
                  </Box>

                  {/* Website */}
                  {user.websiteUrl && (
                    <Box>
                      <Typography mt={4}>Website</Typography>

                      <a
                        href={user.websiteUrl}
                        style={{ textDecoration: 'none', color: 'inherit' }}
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
                            <LanguageIcon />
                          </ListItemIcon>
                          <ListItemText primary={user.websiteUrl} />
                        </StyledListItemButtonWithHover>
                      </a>
                    </Box>
                  )}

                  {/* Social Media */}
                  <Box>
                    <Typography mt={4}>Socials</Typography>

                    <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                      {Object.entries(user.socialMediaLinks).map(
                        ([key, link]) =>
                          link ? (
                            <Grid item xs={6} key={key}>
                              <a
                                href={link}
                                style={{
                                  textDecoration: 'none',
                                  color: 'inherit',
                                }}
                                target='_blank'
                                rel='noopener noreferrer'
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
                                    {iconMapping[key]}
                                  </ListItemIcon>
                                  <ListItemText
                                    primary={
                                      key.charAt(0).toUpperCase() + key.slice(1)
                                    }
                                  />
                                </StyledListItemButtonWithHover>
                              </a>
                            </Grid>
                          ) : null
                      )}
                    </Grid>
                  </Box>

                  {/* Communication */}
                  {user.communication &&
                    Object.keys(user.communication).some(
                      (key) => user.communication[key]
                    ) && (
                      <Box mt={4}>
                        <Typography>Communication</Typography>

                        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                          {/* WhatsApp */}
                          {user.communication.whatsApp && (
                            <Grid item xs={6} key='whatsApp'>
                              <a
                                href={`https://wa.me/${user.communication.whatsApp}`}
                                style={{
                                  textDecoration: 'none',
                                  color: 'inherit',
                                }}
                                target='_blank'
                                rel='noopener noreferrer'
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
                                    <WhatsAppIcon />
                                  </ListItemIcon>
                                  <ListItemText primary='WhatsApp' />
                                </StyledListItemButtonWithHover>
                              </a>
                            </Grid>
                          )}

                          {/* Viber */}
                          {user.communication.viber && (
                            <Grid item xs={6} key='viber'>
                              <a
                                href={`viber://contact?number=${user.communication.viber}`}
                                style={{
                                  textDecoration: 'none',
                                  color: 'inherit',
                                }}
                                target='_blank'
                                rel='noopener noreferrer'
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
                                    <ViberIcon />
                                  </ListItemIcon>
                                  <ListItemText primary='Viber' />
                                </StyledListItemButtonWithHover>
                              </a>
                            </Grid>
                          )}

                          {/* Telegram */}
                          {user.communication.telegram && (
                            <Grid item xs={6} key='telegram'>
                              <a
                                href={`https://t.me/${user.communication.telegram}`}
                                style={{
                                  textDecoration: 'none',
                                  color: 'inherit',
                                }}
                                target='_blank'
                                rel='noopener noreferrer'
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
                                    <TelegramIcon />
                                  </ListItemIcon>
                                  <ListItemText primary='Telegram' />
                                </StyledListItemButtonWithHover>
                              </a>
                            </Grid>
                          )}
                        </Grid>
                      </Box>
                    )}

                  {/* Address */}
                  {user.address && (
                    <>
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
                    </>
                  )}

                  {/* Portfolio */}
                  <Box>
                    {user.portfolioImages &&
                      user.portfolioImages.length > 0 && (
                        <>
                          <Typography mt={4}>Portfolio</Typography>
                          <ImageList
                            cols={3}
                            rowHeight={164}
                            gap={8}
                            sx={{ width: '100%' }}
                          >
                            {user.portfolioImages.map((imageUrl, index) => (
                              <ImageListItem key={index}>
                                <img
                                  src={imageUrl}
                                  alt={`Portfolio Image ${index + 1}`}
                                  loading='lazy'
                                  style={{
                                    objectFit: 'cover',
                                    width: '100%',
                                    height: '100%',
                                    cursor: 'pointer',
                                  }}
                                  onClick={() => handleImageClick(imageUrl)}
                                />
                              </ImageListItem>
                            ))}
                          </ImageList>
                        </>
                      )}
                  </Box>

                  {/* Save to Contact Button */}
                  <Box mt={5}>
                    <Button
                      fullWidth
                      size='small'
                      variant='contained'
                      style={{ backgroundColor: '#FF914D' }}
                      onClick={handleSaveToContact}
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
                        href='https://www.facebook.com/people/Tap-Solutions-PH/61562222303031'
                        style={{ color: 'red', textDecoration: 'none' }}
                        target='_blank'
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

        {/* Lightbox Dialog */}
        <Dialog
          open={openLightbox}
          onClose={handleCloseLightbox}
          maxWidth='md'
          fullWidth
        >
          <Box sx={{ position: 'relative' }}>
            <IconButton
              onClick={handleCloseLightbox}
              sx={{ position: 'absolute', top: 8, right: 8 }}
            >
              <CloseIcon />
            </IconButton>
            {currentImage && (
              <Image
                src={currentImage}
                alt='Full Size'
                width={1200}
                height={800}
                style={{ width: '100%', height: 'auto' }}
              />
            )}
          </Box>
        </Dialog>
      </main>
    </div>
  );
}
