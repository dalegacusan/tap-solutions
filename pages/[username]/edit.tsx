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
  Modal,
  ListItemText,
  ListItem,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddIcon from '@mui/icons-material/Add';
import { styled, useTheme } from '@mui/material/styles';
import {
  DragDropContext,
  Droppable,
  Draggable,
  resetServerContext,
} from 'react-beautiful-dnd';
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

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const socialMediaItems = [
  { icon: <XIcon />, identifier: 'twitter', label: 'Twitter' },
  { icon: <FacebookIcon />, identifier: 'facebook', label: 'Facebook' },
  { icon: <InstagramIcon />, identifier: 'instagram', label: 'Instagram' },
  { icon: <LinkedInIcon />, identifier: 'linkedIn', label: 'LinkedIn' },
];

export default function EditPage() {
  const router = useRouter();
  const theme = useTheme();

  // fake data generator
  const getItems = (count) =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
      id: `widget-${k}`,
      content: `Widget ${k}`,
    }));

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

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

  const initialItems = getItems(10);
  const [items, setItems] = useState(initialItems);
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
        // Remove the social media link if the input value is empty
        setFormData({
          ...formData,
          socialMediaLinks: {
            ...formData.socialMediaLinks,
            [currentIdentifier]: '',
          },
        });
      } else {
        // Update the social media link
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
      // Provide feedback to the user or handle the error
      alert('At least one social media link must be defined.');
      return;
    }

    // Proceed with saving the form data
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

      // Extract specific contact information
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
    if(router.query.username){
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
        setFormData={setFormData}
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
                  <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId='droppable'>
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {items.map((item, index) => (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided) => (
                                <ListItem
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  sx={{
                                    margin: '8px 0px',
                                    boxShadow: 1,
                                    borderRadius: '6px',
                                  }}
                                >
                                  <ListItemText primary={item.content} />
                                </ListItem>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
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
