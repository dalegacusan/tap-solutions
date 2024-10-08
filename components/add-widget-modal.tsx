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
import ViberIcon from './icons/viber-icon';
import LanguageIcon from '@mui/icons-material/Language';
import CallIcon from '@mui/icons-material/Call';

export const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

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
  const [currentWidgetLabel, setCurrentWidgetLabel] = useState('');
  const [currentWidgetNote, setCurrentWidgetNote] = useState('');
  const [currentValue, setCurrentValue] = useState('');

  const handleOpenSubModal = (widgetType, widgetLabel, widgetNote) => {
    setCurrentWidget(widgetType);
    setCurrentWidgetLabel(widgetLabel);
    setCurrentWidgetNote(widgetNote);
    setCurrentValue(formData[widgetType] || '');
    setSubModalOpen(true);
  };

  const handleSaveSubModal = () => {
    if (currentWidget.startsWith('emailAddress')) {
      const emailIndex = currentWidget.replace('emailAddress', '');
      const emailKey = `emailAddress${emailIndex || ''}`; // will be 'emailAddress' for the first one
      setFormData({
        ...formData,
        [emailKey]: currentValue,
      });
    } else if (currentWidget.startsWith('phoneNumber')) {
      const phoneNumberIndex = currentWidget.replace('phoneNumber', '');
      const phoneNumberKey = `phoneNumber${phoneNumberIndex || ''}`; // will be 'phoneNumber' for the first one
      setFormData({
        ...formData,
        [phoneNumberKey]: currentValue,
      });
    } else if (
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
    { type: 'phoneNumber', icon: <CallIcon />, label: 'Phone Number 1' },
    { type: 'phoneNumber2', icon: <CallIcon />, label: 'Phone Number 2' },
    { type: 'emailAddress', icon: <EmailIcon />, label: 'Email Address 1' },
    { type: 'emailAddress2', icon: <EmailIcon />, label: 'Email Address 2' },
    { type: 'emailAddress3', icon: <EmailIcon />, label: 'Email Address 3' },
    { type: 'emailAddress4', icon: <EmailIcon />, label: 'Email Address 4' },
    { type: 'address', icon: <BusinessIcon />, label: 'Address' },
    { type: 'jobTitle', icon: <WorkIcon />, label: 'Job Title' },
    { type: 'company', icon: <AssignmentIcon />, label: 'Company' },
    { type: 'websiteUrl', icon: <LanguageIcon />, label: 'Website URL' },
    { type: 'whatsApp', icon: <WhatsAppIcon />, label: 'WhatsApp (Phone Number)' },
    { type: 'viber', icon: <ViberIcon />, label: 'Viber (Phone Number)' },
    { type: 'telegram', icon: <TelegramIcon />, label: 'Telegram', note: 'Please use phone number (starting with +63) or username.' },
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

  // Separate widgets into communication and non-communication
  const communicationWidgets = availableWidgets.filter((widget) =>
    ['whatsApp', 'viber', 'telegram'].includes(widget.type)
  );

  const nonCommunicationWidgets = availableWidgets.filter(
    (widget) => !['whatsApp', 'viber', 'telegram'].includes(widget.type) && !widget.type.startsWith('emailAddress') && !widget.type.startsWith('phoneNumber')
  );

  // Check if all widgets are used
  const allWidgetsUsed = availableWidgets.length === 0;

  const getNextAvailableEmailWidget = () => {
    if (!formData.emailAddress) return 'emailAddress';
    if (!formData.emailAddress2) return 'emailAddress2';
    if (!formData.emailAddress3) return 'emailAddress3';
    if (!formData.emailAddress4) return 'emailAddress4';
    return null; // No available email widgets
  };

  const getNextAvailablePhoneNumberWidget = () => {
    if (!formData.phoneNumber) return 'phoneNumber';
    if (!formData.phoneNumber2) return 'phoneNumber2';
    return null; // No available email widgets
  };

  // Get the next email widget to display
  const nextEmailWidget = getNextAvailableEmailWidget();
  const nextPhoneNumberWidget = getNextAvailablePhoneNumberWidget();

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
            <>
              {/* Render only the next available email widget */}
              {nextEmailWidget && (
                <ListItemButton
                  key={nextEmailWidget}
                  onClick={() => handleOpenSubModal(nextEmailWidget, `Email Address ${nextEmailWidget.replace('emailAddress', '')}`, '')}
                  sx={{
                    margin: '8px 0px',
                    boxShadow: 1,
                    borderRadius: '6px',
                  }}
                >
                  <ListItemIcon><EmailIcon /></ListItemIcon>
                  <ListItemText primary={`Email Address ${nextEmailWidget.replace('emailAddress', '')}`} />
                </ListItemButton>
              )}

              {/* Render only the next available phone number widget */}
              {nextPhoneNumberWidget && (
                <ListItemButton
                  key={nextPhoneNumberWidget}
                  onClick={() => handleOpenSubModal(nextPhoneNumberWidget, `Phone Number ${nextPhoneNumberWidget.replace('phoneNumber', '')}`, '')}
                  sx={{
                    margin: '8px 0px',
                    boxShadow: 1,
                    borderRadius: '6px',
                  }}
                >
                  <ListItemIcon><CallIcon /></ListItemIcon>
                  <ListItemText primary={`Phone Number ${nextPhoneNumberWidget.replace('phoneNumber', '')}`} />
                </ListItemButton>
              )}

              {/* Non-communication Widgets */}
              {nonCommunicationWidgets.map((widget) => (
                <ListItemButton
                  key={widget.type}
                  onClick={() =>
                    handleOpenSubModal(widget.type, widget.label, widget.note)
                  }
                  sx={{
                    margin: '8px 0px',
                    boxShadow: 1,
                    borderRadius: '6px',
                  }}
                >
                  <ListItemIcon>{widget.icon}</ListItemIcon>
                  <ListItemText primary={widget.label} />
                </ListItemButton>
              ))}

              {/* Communication Widgets */}
              {communicationWidgets.length > 0 && (
                <>
                  <Typography variant='body1' sx={{ marginTop: 3 }}>
                    Communication
                  </Typography>
                  {communicationWidgets.map((widget) => (
                    <ListItemButton
                      key={widget.type}
                      onClick={() =>
                        handleOpenSubModal(
                          widget.type,
                          widget.label,
                          widget.note
                        )
                      }
                      sx={{
                        margin: '8px 0px',
                        boxShadow: 1,
                        borderRadius: '6px',
                      }}
                    >
                      <ListItemIcon>{widget.icon}</ListItemIcon>
                      <ListItemText primary={`${widget.label}`} />
                    </ListItemButton>
                  ))}
                </>
              )}
            </>
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
          <Typography
            id='sub-modal-title'
            variant='h6'
            component='h2'
            mb={currentWidgetNote ? 0 : 3}
          >
            Enter {currentWidgetLabel}
          </Typography>
          {currentWidgetNote && (
            <Box mb={3}>
              <Typography id='sub-modal-title' variant='caption'>
                {currentWidgetNote}
              </Typography>
            </Box>
          )}
          <TextField
            fullWidth
            label={currentWidgetLabel}
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
