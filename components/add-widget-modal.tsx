import { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import InfoIcon from '@mui/icons-material/Info';
import BusinessIcon from '@mui/icons-material/Business';
import WorkIcon from '@mui/icons-material/Work';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ViberIcon from '@mui/icons-material/Call'; // Use appropriate icon for Viber

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

const nestedModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const AddWidgetModal = ({ open, onClose, formData, setFormData }) => {
  const [subModalOpen, setSubModalOpen] = useState(false);
  const [currentWidget, setCurrentWidget] = useState('');
  const [currentValue, setCurrentValue] = useState('');

  const handleOpenSubModal = (widgetType) => {
    setCurrentWidget(widgetType);
    setCurrentValue(formData[widgetType] || '');
    setSubModalOpen(true);
  };

  const handleSaveSubModal = () => {
    // Directly update the formData state
    if (
      currentWidget === 'whatsApp' ||
      currentWidget === 'viber' ||
      currentWidget === 'telegram'
    ) {
      setFormData({
        ...formData,
        communication: {
          ...formData.communication,
          [currentWidget]: currentValue,
        },
      });
    } else {
      setFormData({
        ...formData,
        [currentWidget]: currentValue,
      });
    }

    setSubModalOpen(false);
  };

  // Define the widgets and their identifiers
  const widgets = [
    { type: 'aboutMe', icon: <InfoIcon />, label: 'About Me' },
    { type: 'emailAddress', icon: <EmailIcon />, label: 'Email Address' },
    { type: 'address', icon: <BusinessIcon />, label: 'Address' },
    { type: 'jobTitle', icon: <WorkIcon />, label: 'Job Title' },
    { type: 'company', icon: <AssignmentIcon />, label: 'Company' },
    { type: 'whatsApp', icon: <WhatsAppIcon />, label: 'WhatsApp' },
    { type: 'viber', icon: <ViberIcon />, label: 'Viber' },
    { type: 'telegram', icon: <TelegramIcon />, label: 'Telegram' },
  ];

  // Function to check if a widget is used
  const isWidgetUsed = (widgetType) => {
    if (
      widgetType === 'whatsApp' ||
      widgetType === 'viber' ||
      widgetType === 'telegram'
    ) {
      return formData.communication && formData.communication[widgetType];
    }
    return formData[widgetType];
  };

  // Filter widgets that are not used (i.e., formData fields that are empty)
  const availableWidgets = widgets.filter(
    (widget) => !isWidgetUsed(widget.type)
  );

  // Check if all widgets are used
  const allWidgetsUsed = availableWidgets.length === 0;

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={modalStyle}>
          <Typography id='modal-modal-title' variant='h6' component='h2' mb={3}>
            Add Widget
          </Typography>

          {allWidgetsUsed ? (
            <Typography variant='body1' color='textSecondary'>
              All widgets are used.
            </Typography>
          ) : (
            availableWidgets.map((widget) => (
              <ListItemButton
                key={widget.type}
                onClick={() => handleOpenSubModal(widget.type)}
                sx={{
                  margin: '8px 0px',
                  boxShadow: 1,
                  borderRadius: '6px',
                }}
              >
                <ListItemIcon>{widget.icon}</ListItemIcon>
                <ListItemText primary={widget.label} />
              </ListItemButton>
            ))
          )}
        </Box>
      </Modal>

      {/* Sub-Modal for Widget Input */}
      <Modal
        open={subModalOpen}
        onClose={() => setSubModalOpen(false)}
        aria-labelledby='sub-modal-title'
        aria-describedby='sub-modal-description'
      >
        <Box sx={nestedModalStyle}>
          <Typography id='sub-modal-title' variant='h6' component='h2' mb={3}>
            Enter {currentWidget.replace(/([A-Z])/g, ' $1').trim()}
          </Typography>
          <TextField
            fullWidth
            label={currentWidget.replace(/([A-Z])/g, ' $1').trim()}
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            variant='contained'
            color='primary'
            onClick={handleSaveSubModal}
          >
            Save
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default AddWidgetModal;
