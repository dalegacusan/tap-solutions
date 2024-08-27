import Head from 'next/head';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  ImageList,
  ImageListItem,
  IconButton,
  Snackbar,
  Alert,
  Avatar,
  Dialog,
  FormControl,
  InputLabel,
  FilledInput,
  InputAdornment,
  OutlinedInput,
  Switch,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { resetServerContext } from 'react-beautiful-dnd';
import EmailIcon from '@mui/icons-material/Email';
import InfoIcon from '@mui/icons-material/Info';
import BusinessIcon from '@mui/icons-material/Business';
import WorkIcon from '@mui/icons-material/Work';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DeleteIcon from '@mui/icons-material/Delete';
import Image from 'next/image';
import CloseIcon from '@mui/icons-material/Close';
import { User } from '../interfaces/user.interface';
import AddWidgetModal from '../components/add-widget-modal';
import SocialMediaEditButtonModal from '../components/social-media-edit-button-modal';
import PasswordModal from '../components/password-modal';
import SocialMediaEditButton from '../components/social-media-edit-button';
import DraggableWidgets from '../components/draggable-widgets';
import FileUpload, { s3Client } from '../components/file-upload';
import addDocument from '../firestore/addDocument';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TikTokIcon from '../components/icons/tiktok-icon';
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ViberIcon from '../components/icons/viber-icon';
import { normalizePhoneNumber } from './[username]/edit';
import LanguageIcon from '@mui/icons-material/Language';
import ColorPicker from '../components/color-picker';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library

const widgetIcons = {
  aboutMe: <InfoIcon />,
  emailAddress: <EmailIcon />,
  address: <BusinessIcon />,
  jobTitle: <WorkIcon />,
  company: <AssignmentIcon />,
  website: <LanguageIcon />,
};

const socialMediaItems = [
  { icon: <XIcon />, identifier: 'twitter', label: 'Twitter' },
  { icon: <FacebookIcon />, identifier: 'facebook', label: 'Facebook' },
  { icon: <InstagramIcon />, identifier: 'instagram', label: 'Instagram' },
  { icon: <LinkedInIcon />, identifier: 'linkedIn', label: 'LinkedIn' },
  { icon: <YouTubeIcon />, identifier: 'youtube', label: 'Youtube' },
  { icon: <TikTokIcon />, identifier: 'tiktok', label: 'TikTok' },
];

const getWidgetContent = (formData) => {
  return [
    {
      id: 'aboutMe',
      content: formData.aboutMe || '',
      icon: widgetIcons.aboutMe,
    },
    {
      id: 'emailAddress',
      content: formData.emailAddress || '',
      icon: widgetIcons.emailAddress,
    },
    {
      id: 'address',
      content: formData.address || '',
      icon: widgetIcons.address,
    },
    {
      id: 'jobTitle',
      content: formData.jobTitle || '',
      icon: widgetIcons.jobTitle,
    },
    {
      id: 'company',
      content: formData.company || '',
      icon: widgetIcons.company,
    },
    {
      id: 'websiteUrl',
      label: 'Website URL',
      content: formData.websiteUrl || '',
      icon: widgetIcons.website,
    },
    {
      id: 'whatsApp',
      content: formData.communication?.whatsApp || '',
      icon: <WhatsAppIcon />,
    },
    {
      id: 'viber',
      content: formData.communication?.viber || '',
      icon: <ViberIcon />,
    },
    {
      id: 'telegram',
      content: formData.communication?.telegram || '',
      icon: <TelegramIcon />,
    },
  ].filter((widget) => widget.content); // Only include widgets with content
};

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default function DashboardPage() {
  const [formData, setFormData] = useState<User>({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    socialMediaLinks: {
      twitter: '',
      facebook: '',
      instagram: '',
      linkedIn: '',
      youtube: '',
      tiktok: '',
    },
    communication: {
      whatsApp: '',
      viber: '',
      telegram: '',
    },
    aboutMe: '',
    emailAddress: '',
    address: '',
    jobTitle: '',
    company: '',
    profilePictureUrl: '',
    bannerUrl: '',
    bannerColor: '',
    backgroundUrl: '',
    backgroundColor: '',
    websiteUrl: '',
    portfolioImages: [],
    dateCreated: null,
    dateUpdated: null,
  });

  // Define the state for background and banner options
  const [useBannerImage, setUseBannerImage] = useState<boolean>(true);
  const [bannerColor, setBannerColor] = useState<string>('#FFFFFF'); // Default color
  const [isBannerUseDefaultChecked, setIsBannerUseDefaultChecked] =
    useState<boolean>(true);

  const [useBackgroundImage, setUseBackgroundImage] = useState<boolean>(true);
  const [backgroundColor, setBackgroundColor] = useState<string>('#FFFFFF'); // Default color
  const [isBackgroundUseDefaultChecked, setIsBackgroundUseDefaultChecked] =
    useState<boolean>(true);

  const [items, setItems] = useState(getWidgetContent(formData));
  const [editSocialMediaModalIsOpen, setEditSocialMediaModalIsOpen] =
    useState(false);
  const [currentIdentifier, setCurrentIdentifier] = useState<string | null>(
    null
  );
  const [currentValue, setCurrentValue] = useState<string>('');
  const [addWidgetModalIsOpen, setAddWidgetModalIsOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: string }>(
    {}
  );
  const [passwordModalIsOpen, setPasswordModalIsOpen] = useState(true); // Show password modal on load
  const [userPassword, setUserPassword] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'info' | 'error'>(
    'success'
  );

  const [openLightbox, setOpenLightbox] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState(false);

  const handleBannerSwitchChange = () => {
    setUseBannerImage((prev) => {
      const newUseBannerImage = !prev;
      if (newUseBannerImage) {
        // Switch to image, clear color
        setBannerColor('#FFFFFF'); // or your default color
        setFormData((prev) => ({
          ...prev,
          bannerColor: '',
          bannerUrl: uploadedFiles.bannerUrl || prev.bannerUrl,
        }));
      } else {
        let prevBannerColor;

        // Switch to color, clear image
        setFormData((prev) => {
          prevBannerColor = prev.bannerColor;

          return {
            ...prev,
            bannerUrl: '',
            bannerColor: prev.bannerColor || '#FFFFFF',
          };
        });

        setBannerColor(prevBannerColor || '#FFFFFF'); // or use default color
      }
      return newUseBannerImage;
    });
  };

  const handleBackgroundSwitchChange = () => {
    setUseBackgroundImage((prev) => {
      const newUseBackgroundImage = !prev;
      if (newUseBackgroundImage) {
        // Switch to image, clear color
        setBackgroundColor('#FFFFFF'); // or your default color
        setFormData((prev) => ({
          ...prev,
          backgroundColor: '',
          backgroundUrl: uploadedFiles.backgroundUrl || prev.backgroundUrl,
        }));
      } else {
        let prevBackgroundColor;
        setFormData((prev) => {
          prevBackgroundColor = prev.backgroundColor;

          return {
            ...prev,
            backgroundUrl: '',
            backgroundColor: prev.backgroundColor || '#FFFFFF',
          };
        });

        // Switch to color, clear image
        setBackgroundColor(prevBackgroundColor || '#FFFFFF'); // or use default color
      }
      return newUseBackgroundImage;
    });
  };

  const handleBannerColorChange = (color: string) => {
    setBannerColor(color);
    setFormData((prev) => ({
      ...prev,
      bannerColor: color, // Set the color value
      bannerUrl: '', // Clear the image URL
    }));
  };

  const handleBackgroundColorChange = (color: string) => {
    setBackgroundColor(color);
    setFormData((prev) => ({
      ...prev,
      backgroundColor: color, // Set the color value
      backgroundUrl: '', // Clear the image URL
    }));
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleImageClick = (imageUrl: string) => {
    setCurrentImage(imageUrl);
    setOpenLightbox(true);
  };

  const handleCloseLightbox = () => {
    setOpenLightbox(false);
    setCurrentImage(null);
  };

  const handleDeleteImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      portfolioImages: prev.portfolioImages.filter((_, i) => i !== index),
    }));
  };

  const handlePortfolioImageUpload = async (file: File) => {
    const fileName = `${uuidv4()}`; // Generate UUID and append file name
    const uploadParams = {
      Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME, // Replace with your bucket name
      Key: fileName,
      Body: file,
      ContentType: file.type,
    };

    try {
      const command = new PutObjectCommand(uploadParams);
      const result = await s3Client.send(command);
      // Construct the URL to access the file
      const fileUrl = `https://${uploadParams.Bucket}.s3.amazonaws.com/${fileName}`; // Construct the file URL
      return fileUrl; // The S3 URL of the uploaded file
    } catch (error) {
      throw new Error('Error uploading file');
    }
  };

  const handleAddImageClick = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const maxNumberOfPortfolioImages = 9;
      if (formData.portfolioImages.length === maxNumberOfPortfolioImages) {
        setSnackbarMessage(`You can only upload up to ${maxNumberOfPortfolioImages} images.`);
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        return;
      }

      // Check if the file type is allowed
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        setSnackbarMessage(
          'Invalid file type. Please upload PNG, JPEG, or JPG images.'
        );
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        return;
      }

      try {
        const url = await handlePortfolioImageUpload(file);
        // Update form data with S3 URL
        setFormData((prev) => ({
          ...prev,
          portfolioImages: [...prev.portfolioImages, url], // Update formData with new image URL
        }));
      } catch (error) {
        setSnackbarMessage('Error uploading file. Please try again.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    }
  };

  const handleButtonClick = (identifier: string) => {
    const link = formData.socialMediaLinks[identifier] || '';
    setCurrentIdentifier(identifier);
    setCurrentValue(link);
    setEditSocialMediaModalIsOpen(true);
  };

  const handleSave = (newValue: string) => {
    if (currentIdentifier) {
      setFormData((prevData) => ({
        ...prevData,
        socialMediaLinks: {
          ...prevData.socialMediaLinks,
          [currentIdentifier]: newValue,
        },
      }));
    }
    setEditSocialMediaModalIsOpen(false);
  };

  const handleSaveForm = async () => {
    const {
      username,
      firstName,
      lastName,
      phoneNumber,
      socialMediaLinks,
      profilePictureUrl,
      bannerUrl,
      backgroundUrl,
      portfolioImages,
      password, // Include password from formData
      communication,
    } = formData;

    const hasDefinedSocialMedia = Object.values(socialMediaLinks).some(
      (link) => link.trim() !== ''
    );

    if (!isLoggedIn) {
      setPasswordModalIsOpen(true); // Open the password modal if password is not yet verified
      return;
    }

    // Validation check
    if (!username.trim()) {
      setSnackbarMessage('Username is required.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    if (!password.trim()) {
      setSnackbarMessage('Password is required.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    if (!firstName.trim()) {
      setSnackbarMessage('First Name is required.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    if (!lastName.trim()) {
      setSnackbarMessage('Last Name is required.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    if (!phoneNumber.trim()) {
      setSnackbarMessage('Phone Number is required.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    if (!hasDefinedSocialMedia) {
      setSnackbarMessage('At least one social media link must be defined.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    try {
      // Hash the password using the API route
      const { data } = await axios.post('/api/hash-password', { password });
      const hashedPassword = data.hashedPassword;

      const dateCreated = new Date();
      // Normalize phone numbers before saving
      const normalizedCommunication = {
        whatsApp: normalizePhoneNumber(communication.whatsApp || ''),
        viber: normalizePhoneNumber(communication.viber || ''),
        telegram: communication.telegram || '',
      };

      const updatedFormData: User = {
        ...formData,
        password: hashedPassword, // Save the hashed password
        profilePictureUrl: uploadedFiles.profilePictureUrl || profilePictureUrl,
        bannerUrl: uploadedFiles.bannerUrl || bannerUrl,
        backgroundUrl: uploadedFiles.backgroundUrl || backgroundUrl,
        portfolioImages, // Use formData portfolioImages directly
        dateCreated,
        dateUpdated: dateCreated,
        communication: normalizedCommunication,
      };

      if (isBackgroundUseDefaultChecked) {
        updatedFormData.backgroundUrl = '';
        updatedFormData.backgroundColor = '';
      }

      if (isBannerUseDefaultChecked) {
        updatedFormData.bannerUrl = '';
        updatedFormData.bannerColor = '';
      }

      if (!isBannerUseDefaultChecked && useBannerImage && !bannerUrl) {
        setSnackbarMessage('Please upload a banner image.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        return;
      }

      if (
        !isBackgroundUseDefaultChecked &&
        useBackgroundImage &&
        !backgroundUrl
      ) {
        setSnackbarMessage('Please upload a background image.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        return;
      }

      setSnackbarMessage('Creating account...');
      setSnackbarSeverity('info');
      setSnackbarOpen(true);

      // Save the form data to Firestore
      const { result, error } = await addDocument(
        'users',
        updatedFormData.username,
        updatedFormData
      );

      if (error) {
        setSnackbarMessage(`Error adding data: ${error}`);
        setSnackbarSeverity('error');
      } else {
        setSnackbarMessage('Account added successfully!');
        setSnackbarSeverity('success');
      }
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage('Error hashing password');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handlePasswordCorrect = () => {
    setPasswordModalIsOpen(false);
  };

  useEffect(() => {
    setFormData(formData);

    // Update items based on the updated formData
    setItems(getWidgetContent(formData));
  }, []);

  const handleTextFieldChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [field]: event.target.value,
      });
    };

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const reorderedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );
    // @ts-ignore
    setItems(reorderedItems);
  }

  const isSocialMediaDefined = (identifier: string): boolean => {
    if (formData.socialMediaLinks) {
      return Boolean(formData.socialMediaLinks[identifier]);
    }
    return false;
  };

  const handleFileUpload =
    (field: 'profilePictureUrl' | 'bannerUrl' | 'backgroundUrl') =>
    (url: string) => {
      setUploadedFiles((prev) => ({ ...prev, [field]: url }));

      // Clear color values if image is selected
      if (field === 'bannerUrl') {
        setFormData((prev) => ({
          ...prev,
          bannerUrl: url,
          bannerColor: '', // Clear the color value
        }));
      } else if (field === 'backgroundUrl') {
        setFormData((prev) => ({
          ...prev,
          backgroundUrl: url,
          backgroundColor: '', // Clear the color value
        }));
      }
    };

  return (
    <div>
      <Head>
        <title>Tap Technologies - Dashboard</title>
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

        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://taptech.ph/' />
        <meta property='og:title' content='Tap Technologies' />
        <meta
          property='og:description'
          content='Tap into the future and revolutionize the way you share your business and contact information by using an environmentally friendly alternative business card'
        />
        <meta
          property='og:image'
          content='/images/logo.png'
        />

        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:url' content='https://taptech.ph/' />
        <meta property='twitter:title' content='Tap Technologies' />
        <meta
          property='twitter:description'
          content='Tap into the future and revolutionize the way you share your business and contact information by using an environmentally friendly alternative business card'
        />
        <meta
          property='twitter:image'
          content='/images/logo.png'
        />
      </Head>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
          style={{
            backgroundColor: 
              snackbarSeverity === 'success' ? '#4caf50' :
              snackbarSeverity === 'error' ? '#f44336' :
              snackbarSeverity === 'info' ? '#0288d1' :
              '#000000', // default color if severity is none of the above
            color: '#ffffff',
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <PasswordModal
        open={passwordModalIsOpen}
        onClose={() => setPasswordModalIsOpen(false)}
        onPasswordCorrect={handlePasswordCorrect}
        userPassword={userPassword} // Pass the user password
        setUserPassword={setUserPassword}
        username={formData.username as string} // Pass the username
        setIsLoggedIn={setIsLoggedIn}
      />

      <SocialMediaEditButtonModal
        open={editSocialMediaModalIsOpen}
        onClose={() => setEditSocialMediaModalIsOpen(false)}
        label={
          socialMediaItems.find((item) => item.identifier === currentIdentifier)
            ?.label || ''
        }
        value={currentValue}
        onSave={handleSave}
      />

      <AddWidgetModal
        open={addWidgetModalIsOpen}
        onClose={() => setAddWidgetModalIsOpen(false)}
        formData={formData}
        setFormData={(updatedFormData) => {
          setFormData(updatedFormData);
          setItems(getWidgetContent(updatedFormData)); // Update items based on new formData
        }}
      />

      <main>
        <Grid
          container
          spacing={0}
          alignItems='center'
          justifyContent='center'
          sx={{ minHeight: '100vh' }}
          mt={8}
          mb={8}
        >
          <Grid item lg={4} md={6} xs={12} px={4}>
            <Box>
              <Typography variant='h5' mb={4} style={{ fontWeight: 'bold' }}>
                Add User
              </Typography>

              <Grid container spacing={2}>
                <Grid item md={8} xs={12}>
                  <Typography gutterBottom>Profile Picture</Typography>
                  <FileUpload
                    onUpload={handleFileUpload('profilePictureUrl')}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  {formData.profilePictureUrl ||
                  uploadedFiles.profilePictureUrl ? (
                    <Avatar
                      src={
                        uploadedFiles.profilePictureUrl ||
                        formData.profilePictureUrl ||
                        '/images/logo.png'
                      }
                      alt='Profile Picture'
                      style={{ width: 120, height: 120, marginLeft: '40px' }}
                    />
                  ) : (
                    <Typography>No profile picture uploaded.</Typography>
                  )}
                </Grid>
              </Grid>

              <Grid container spacing={2} mt={3}>
                <Grid item md={8} xs={12}>
                  <Typography gutterBottom>Banner</Typography>

                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isBannerUseDefaultChecked}
                          size='small'
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setIsBannerUseDefaultChecked(event.target.checked);

                            if (event.target.checked) {
                              setUseBannerImage(false);
                              setBannerColor('#FFFFFF');
                            }
                          }}
                        />
                      }
                      label='Use Default'
                      sx={{
                        '& .MuiFormControlLabel-label': {
                          fontSize: '12px', // Adjust font size here
                        },
                      }}
                    />
                  </FormGroup>

                  {!isBannerUseDefaultChecked && (
                    <>
                      <Typography
                        style={{
                          marginRight: '8px',
                          display: 'inline',
                          fontWeight: 'bold',
                        }}
                      >
                        Color
                      </Typography>
                      <Switch
                        checked={useBannerImage}
                        onChange={handleBannerSwitchChange}
                        color='primary'
                      />
                      <Typography
                        style={{
                          marginLeft: '8px',
                          display: 'inline',
                          fontWeight: 'bold',
                        }}
                      >
                        Image
                      </Typography>

                      {useBannerImage ? (
                        <>
                          <FileUpload
                            onUpload={handleFileUpload('bannerUrl')}
                          />
                          {!formData.bannerUrl && !uploadedFiles.bannerUrl && (
                            <Typography mt={2}>
                              No banner picture uploaded.
                            </Typography>
                          )}
                        </>
                      ) : (
                        <Box mt={2}>
                          <ColorPicker
                            color={bannerColor}
                            onChange={handleBannerColorChange}
                          />
                        </Box>
                      )}
                    </>
                  )}
                </Grid>
                <Grid item md={4} xs={12}>
                  {!isBannerUseDefaultChecked && (
                    <>
                      {useBannerImage && (
                        <>
                          {(formData.bannerUrl || uploadedFiles.bannerUrl) && (
                            <img
                              src={
                                uploadedFiles.bannerUrl ||
                                formData.bannerUrl ||
                                '/images/banner2.png'
                              }
                              alt='Banner'
                              style={{
                                height: 120,
                                marginLeft: '40px',
                                marginTop: '20px',
                              }}
                            />
                          )}
                        </>
                      )}
                    </>
                  )}
                </Grid>
              </Grid>

              <Grid container spacing={2} mt={3}>
                <Grid item md={8} xs={12}>
                  <Typography gutterBottom>Background</Typography>

                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isBackgroundUseDefaultChecked}
                          size='small'
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setIsBackgroundUseDefaultChecked(
                              event.target.checked
                            );

                            if (event.target.checked) {
                              setUseBackgroundImage(false);
                              setBackgroundColor('#FFFFFF');
                            }
                          }}
                        />
                      }
                      label='Use Default'
                      sx={{
                        '& .MuiFormControlLabel-label': {
                          fontSize: '12px', // Adjust font size here
                        },
                      }}
                    />
                  </FormGroup>

                  {!isBackgroundUseDefaultChecked && (
                    <>
                      {/* Color/Image Toggle */}
                      <Typography
                        style={{
                          marginRight: '8px',
                          display: 'inline',
                          fontWeight: 'bold',
                        }}
                      >
                        Color
                      </Typography>
                      <Switch
                        checked={useBackgroundImage}
                        onChange={handleBackgroundSwitchChange}
                        color='primary'
                      />
                      <Typography
                        style={{
                          marginLeft: '8px',
                          display: 'inline',
                          fontWeight: 'bold',
                        }}
                      >
                        Image
                      </Typography>

                      {/* Conditional Rendering based on Switch */}
                      {useBackgroundImage ? (
                        <>
                          <FileUpload
                            onUpload={handleFileUpload('backgroundUrl')}
                          />
                          {!formData.backgroundUrl &&
                            !uploadedFiles.backgroundUrl && (
                              <Typography mt={2}>
                                No background picture uploaded.
                              </Typography>
                            )}
                        </>
                      ) : (
                        <Box mt={2}>
                          <ColorPicker
                            color={backgroundColor}
                            onChange={handleBackgroundColorChange}
                          />
                        </Box>
                      )}
                    </>
                  )}
                </Grid>
                <Grid item md={4} xs={12}>
                  {!isBackgroundUseDefaultChecked && (
                    <>
                      {useBackgroundImage && (
                        <>
                          {(formData.backgroundUrl ||
                            uploadedFiles.backgroundUrl) && (
                            <img
                              src={
                                uploadedFiles.backgroundUrl ||
                                formData.backgroundUrl ||
                                '/images/logo.png'
                              }
                              alt='Background'
                              style={{
                                height: 120,
                                marginLeft: '40px',
                                marginTop: '20px',
                              }}
                            />
                          )}
                        </>
                      )}
                    </>
                  )}
                </Grid>
              </Grid>

              <Box mt={4}>
                <TextField
                  fullWidth
                  required
                  label='Username'
                  value={formData.username}
                  onChange={handleTextFieldChange('username')}
                />
              </Box>

              <Box mt={4}>
                <FormControl variant='outlined' fullWidth required>
                  <InputLabel htmlFor='outlined-adornment-password'>
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id='outlined-adornment-password'
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleTextFieldChange('password')}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge='end'
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label='Password'
                  />
                </FormControl>
              </Box>

              <Box mt={4}>
                <TextField
                  fullWidth
                  required
                  label='First Name'
                  value={formData.firstName}
                  onChange={handleTextFieldChange('firstName')}
                />
              </Box>

              <Box mt={4}>
                <TextField
                  fullWidth
                  required
                  label='Last Name'
                  value={formData.lastName}
                  onChange={handleTextFieldChange('lastName')}
                />
              </Box>

              <Box mt={4}>
                <TextField
                  fullWidth
                  required
                  label='Phone Number'
                  value={formData.phoneNumber}
                  onChange={handleTextFieldChange('phoneNumber')}
                />
              </Box>

              <Grid container spacing={2} mt={2}>
                <Grid item xs={12}>
                  <Typography variant='h6'>Socials</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {socialMediaItems.map((item) => (
                      <Grid item xs={6} key={item.identifier}>
                        <SocialMediaEditButton
                          identifier={item.identifier}
                          icon={item.icon}
                          label={item.label}
                          isSocialMediaDefined={isSocialMediaDefined}
                          onClick={() => handleButtonClick(item.identifier)}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>

              <Grid container spacing={2} mt={2}>
                <Grid item xs={8}>
                  <Typography variant='h6'>Widgets</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    fullWidth
                    variant='contained'
                    startIcon={<AddIcon />}
                    onClick={() => setAddWidgetModalIsOpen(true)}
                    style={{ backgroundColor: '#FF914D' }}
                  >
                    Add Widget
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <DraggableWidgets
                    items={items}
                    onDragEnd={onDragEnd}
                    setItems={setItems}
                    setFormData={setFormData}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2} mt={2}>
                <Grid item xs={8}>
                  <Typography variant='h6'>Portfolio</Typography>
                </Grid>
                <Grid item xs={4}>
                  <input
                    accept='image/png, image/jpeg, image/jpg'
                    id='upload-image'
                    type='file'
                    style={{ display: 'none' }}
                    onChange={handleAddImageClick}
                  />
                  <label htmlFor='upload-image'>
                    <Button
                      fullWidth
                      variant='contained'
                      startIcon={<AddIcon />}
                      style={{ backgroundColor: '#FF914D' }}
                      component='span'
                    >
                      Add Image
                    </Button>
                  </label>
                </Grid>

                {formData.portfolioImages.length > 0 && (
                  <Grid item xs={12}>
                    <Grid item xs={12}>
                      <ImageList cols={3} rowHeight={164} gap={8}>
                        {formData.portfolioImages.map((imageUrl, index) => (
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
                            <IconButton
                              onClick={() => handleDeleteImage(index)}
                              style={{
                                position: 'absolute',
                                top: '8px',
                                right: '8px',
                                color: 'red',
                                zIndex: 1,
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </ImageListItem>
                        ))}
                      </ImageList>
                    </Grid>
                  </Grid>
                )}
              </Grid>

              <Box mt={6}>
                <Button
                  variant='contained'
                  fullWidth
                  color='success'
                  onClick={handleSaveForm}
                  style={{ backgroundColor: '#FF914D' }}
                >
                  Add User
                </Button>
              </Box>
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

export const getServerSideProps = async ({ query }) => {
  resetServerContext();
  return { props: { data: [] } };
};
