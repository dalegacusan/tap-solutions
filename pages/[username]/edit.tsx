import Head from 'next/head';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Grid, Box, Typography, TextField, Button, Modal } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddIcon from '@mui/icons-material/Add';
import { styled, useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import getDocument from '../../firestore/getDocument';
import { User } from '../../interfaces/user.interface';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SocialMediaEditButton from '../../components/social-media-edit-button';
import SocialMediaEditButtonModal from '../../components/social-media-edit-button-modal';
import AddWidgetModal from '../../components/add-widget-modal';
import DraggableWidgets from '../../components/draggable-widgets'; // Import DraggableWidgets
import { resetServerContext } from 'react-beautiful-dnd';
import EmailIcon from '@mui/icons-material/Email';
import InfoIcon from '@mui/icons-material/Info';
import BusinessIcon from '@mui/icons-material/Business';
import WorkIcon from '@mui/icons-material/Work';
import AssignmentIcon from '@mui/icons-material/Assignment';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

// Define icons for widgets
const widgetIcons = {
  aboutMe: <InfoIcon />,
  emailAddress: <EmailIcon />,
  address: <BusinessIcon />,
  jobTitle: <WorkIcon />,
  company: <AssignmentIcon />,
};

const socialMediaItems = [
  { icon: <XIcon />, identifier: 'twitter', label: 'Twitter' },
  { icon: <FacebookIcon />, identifier: 'facebook', label: 'Facebook' },
  { icon: <InstagramIcon />, identifier: 'instagram', label: 'Instagram' },
  { icon: <LinkedInIcon />, identifier: 'linkedIn', label: 'LinkedIn' },
];

const getWidgetContent = (formData) => {
  return [
    {
      id: 'aboutMe',
      content: formData.aboutMe || 'About Me',
      icon: widgetIcons.aboutMe,
    },
    {
      id: 'emailAddress',
      content: formData.emailAddress || 'Email Address',
      icon: widgetIcons.emailAddress,
    },
    {
      id: 'address',
      content: formData.address || 'Address',
      icon: widgetIcons.address,
    },
    {
      id: 'jobTitle',
      content: formData.jobTitle || 'Job Title',
      icon: widgetIcons.jobTitle,
    },
    {
      id: 'company',
      content: formData.company || 'Company',
      icon: widgetIcons.company,
    },
  ].filter((widget) => widget.content); // Only include widgets with content
};

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default function EditPage() {
  const router = useRouter();
  const theme = useTheme();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    socialMediaLinks: {
      twitter: '',
      facebook: '',
      instagram: '',
      linkedIn: '',
    },
    aboutMe: '',
    emailAddress: '',
    address: '',
    jobTitle: '',
    company: '',
  });

  const [items, setItems] = useState(getWidgetContent(formData));
  const [user, setUser] = useState<User | null>(null);
  const [isRetrievingUser, setIsRetrievingUser] = useState<boolean>(true);
  const [isErrorRetrievingUser, setIsErrorRetrievingUser] = useState<
    string | null
  >(null);
  const [editSocialMediaModalIsOpen, setEditSocialMediaModalIsOpen] =
    useState(false);
  const [currentIdentifier, setCurrentIdentifier] = useState<string | null>(
    null
  );
  const [currentValue, setCurrentValue] = useState<string>('');
  const [addWidgetModalIsOpen, setAddWidgetModalIsOpen] = useState(false);

  const handleButtonClick = (identifier: string) => {
    const link = formData.socialMediaLinks[identifier] || '';
    setCurrentIdentifier(identifier);
    setCurrentValue(link);
    setEditSocialMediaModalIsOpen(true);
  };

  const handleSave = (newValue: string) => {
    if (currentIdentifier) {
      if (newValue === '') {
        setFormData({
          ...formData,
          socialMediaLinks: {
            ...formData.socialMediaLinks,
            [currentIdentifier]: '',
          },
        });
      } else {
        setFormData({
          ...formData,
          socialMediaLinks: {
            ...formData.socialMediaLinks,
            [currentIdentifier]: newValue,
          },
        });
      }
    }
    setEditSocialMediaModalIsOpen(false);
  };

  const handleSaveForm = () => {
    const { socialMediaLinks } = formData;
    const hasDefinedSocialMedia = Object.values(socialMediaLinks).some(
      (link) => link.trim() !== ''
    );

    if (!hasDefinedSocialMedia) {
      alert('At least one social media link must be defined.');
      return;
    }

    // Save the form data logic here
  };

  async function getUserDocument() {
    const { result, error } = await getDocument(
      'users',
      router.query.username as string
    );

    if (error) {
      setIsErrorRetrievingUser(error);
    } else {
      const user = result as User;
      setUser(user);

      const contactInfoMap = user.contactInformation.reduce((acc, contact) => {
        acc[contact.identifier] = contact.value;
        return acc;
      }, {} as Record<string, string>);

      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        aboutMe: contactInfoMap['aboutMe'] || '',
        emailAddress: contactInfoMap['emailAddress'] || '',
        address: user.address || '',
        jobTitle: user.job.title || '',
        company: user.job.company || '',
        phoneNumber:
          user.contactInformation.find(
            (contact) => contact.identifier === 'phoneNumber'
          )?.value || '',
        socialMediaLinks: user.socialMedia.reduce(
          (acc, item) => {
            acc[item.identifier] = item.link;
            return acc;
          },
          {
            twitter: '',
            facebook: '',
            instagram: '',
            linkedIn: '',
          }
        ),
      });

      // Update items based on the updated formData
      setItems(
        getWidgetContent({
          aboutMe: formData.aboutMe,
          emailAddress: formData.emailAddress,
          address: formData.address,
          jobTitle: formData.jobTitle,
          company: formData.company,
        })
      );
    }

    setIsRetrievingUser(false);
  }

  const handleTextFieldChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [field]: event.target.value,
      });
    };

  useEffect(() => {
    if (router.query.username) {
      getUserDocument();
    }
  }, [router.query.username]);

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const reorderedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(reorderedItems);
  }

  const isSocialMediaDefined = (identifier: string): boolean => {
    return Boolean(formData.socialMediaLinks[identifier]);
  };

  if (isRetrievingUser) return <p>Loading...</p>;
  if (isErrorRetrievingUser) return <p>Error: {isErrorRetrievingUser}</p>;

  return (
    <div>
      <Head>
        <title>
          {user?.firstName} {user?.lastName} - Edit
        </title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

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
        >
          <Grid item lg={4} md={6} xs={12}>
            <Box>
              <Typography variant='h4' mb={4} style={{ fontWeight: 'bold' }}>
                Hello @{user?.username}!
              </Typography>

              <Typography gutterBottom>Profile Picture</Typography>
              <Button
                fullWidth
                component='label'
                variant='outlined'
                startIcon={<CloudUploadIcon />}
              >
                Upload
                <VisuallyHiddenInput type='file' />
              </Button>

              <Typography gutterBottom mt={2}>
                Banner
              </Typography>
              <Button
                fullWidth
                component='label'
                variant='outlined'
                startIcon={<CloudUploadIcon />}
              >
                Upload
                <VisuallyHiddenInput type='file' />
              </Button>

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
                  <DraggableWidgets items={items} onDragEnd={onDragEnd} setItems={setItems} />
                </Grid>
              </Grid>

              <Grid container spacing={2} mt={2}>
                <Grid item xs={8}>
                  <Typography variant='h6'>Portfolio</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    fullWidth
                    variant='contained'
                    startIcon={<AddIcon />}
                    style={{ backgroundColor: '#FF914D' }}
                  >
                    Add Image
                  </Button>
                </Grid>
              </Grid>

              <Box mt={6}>
                <Button
                  variant='contained'
                  fullWidth
                  color='success'
                  onClick={handleSaveForm}
                  style={{ backgroundColor: '#FF914D' }}
                >
                  Save Changes
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </main>
    </div>
  );
}

export const getServerSideProps = async ({ query }) => {
  resetServerContext();
  return { props: { data: [] } };
};
