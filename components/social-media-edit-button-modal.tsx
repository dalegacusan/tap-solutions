import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface SocialMediaEditButtonModalProps {
  open: boolean;
  onClose: () => void;
  label: string;
  value: string;
  onSave: (newValue: string) => void;
}

const SocialMediaEditButtonModal: React.FC<SocialMediaEditButtonModalProps> = ({
  open,
  onClose,
  label,
  value,
  onSave,
}) => {
  const theme = useTheme();
  const [inputValue, setInputValue] = useState(value);

  // Set the initial value when the modal opens
  useEffect(() => {
    setInputValue(value);
  }, [value, open]);

  // Handle save action
  const handleSave = () => {
    onSave(inputValue.trim()); // Trim the input value to remove unnecessary whitespace
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='modal-title'
      aria-describedby='modal-description'
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: theme.palette.background.paper,
          border: '2px solid',
          borderColor: theme.palette.divider,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id='modal-title' variant='h6' component='h2'>
          {label}
        </Typography>
        <TextField
          fullWidth
          label='URL'
          value={inputValue}
          placeholder='Enter URL'
          onChange={(e) => setInputValue(e.target.value)}
          sx={{ my: 2 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={onClose} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button variant='contained' onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SocialMediaEditButtonModal;
