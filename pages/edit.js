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
  TextField,
  Button,
} from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import InfoIcon from '@mui/icons-material/Info';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import {
  DragDropContext,
  Droppable,
  Draggable,
  resetServerContext,
} from 'react-beautiful-dnd';
import { useState } from 'react';

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

export default function EditPage() {
  const initialItems = getItems(10);
  const [items, setItems] = useState(initialItems);

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
    ],
  };

  return (
    <div>
      <Head>
        <title>
          {portfolio.firstName} {portfolio.lastName} - Edit
        </title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Grid
        container
        spacing={0}
        alignItems='center'
        justifyContent='center'
        sx={{ minHeight: '100vh' }}
      >
        <Grid item lg={4} md={6} xs={12}>
          <Box>
            <Typography variant='h4' mb={4}>
              Hello @{portfolio.username}!
            </Typography>

            <Typography gutterBottom>Profile Picture</Typography>
            <Button
              fullWidth
              component='label'
              role={undefined}
              variant='outlined'
              tabIndex={-1}
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
              role={undefined}
              variant='outlined'
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload
              <VisuallyHiddenInput type='file' />
            </Button>

            <Box mt={2}>
              <TextField
                fullWidth
                required
                id='outlined-required'
                label='First Name'
              />
            </Box>

            <Box mt={2}>
              <TextField
                fullWidth
                required
                id='outlined-required'
                label='Last Name'
              />
            </Box>

            <Box mt={2}>
              <TextField
                fullWidth
                required
                id='outlined-required'
                label='Job Title'
              />
            </Box>

            <Box mt={2}>
              <TextField
                fullWidth
                required
                id='outlined-required'
                label='Company'
              />
            </Box>

            <Box mt={2} mb={2}>
              <TextField fullWidth id='outlined' label='Address' />
            </Box>

            <TextField
              fullWidth
              id='outlined-multiline-static'
              label='About Me'
              multiline
              rows={4}
            />

            <Grid container spacing={2} mt={2}>
              <Grid item xs={8}>
                <Typography variant='h6'>Widgets</Typography>
              </Grid>
              <Grid item xs={4}>
                <Button fullWidth variant='contained' startIcon={<AddIcon />}>
                  Add Widget
                </Button>
              </Grid>
              <Grid item xs={12}>
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId='droppable'>
                    {(provided, snapshot) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <ListItem
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  sx={{
                                    margin: '8px 0px',
                                    boxShadow: 1,
                                    borderRadius: '6px',
                                  }}
                                  className='card-socials'
                                >
                                  {/* <ListItemIcon>{item.icon}</ListItemIcon> */}
                                  <ListItemText primary={item.content} />
                                </ListItem>
                              )}
                            </Draggable>
                          );
                        })}
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
                <Button fullWidth variant='contained' startIcon={<AddIcon />}>
                  Add Image
                </Button>
              </Grid>
            </Grid>

            <Box mt={6}>
              <Button variant='contained' fullWidth color='success'>
                Save
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export const getServerSideProps = async ({ query }) => {
  resetServerContext();

  return { props: { data: [] } };
};
