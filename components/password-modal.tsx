import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface PasswordModalProps {
  open: boolean;
  onClose: () => void;
  onPasswordCorrect: () => void;
  userPassword: string; // Added to pass the user password
}

const PasswordModal: React.FC<PasswordModalProps> = ({ open, onClose, onPasswordCorrect, userPassword }) => {
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    if (userPassword === '') {
      // User hasn't set up a password yet
      // Handle setting up a new password here if needed
      if (password) {
        // Logic to save the new password
        // Example: saveNewPassword(password);
        onPasswordCorrect(); // Close the modal on success
      } else {
        setError('Please enter a password to set up your account.');
      }
    } else {
      // User already has a password
      if (password === userPassword) {
        onPasswordCorrect();
      } else {
        setError('Incorrect password. Please try again.');
      }
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="password-modal-title"
      aria-describedby="password-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="password-modal-title" variant="h6" component="h2">
          {userPassword === '' ? 'Set Up Your Password' : 'Enter Password'}
        </Typography>
        <TextField
          fullWidth
          label={userPassword === '' ? 'New Password' : 'Password'}
          type="password"
          variant="outlined"
          value={password}
          onChange={handlePasswordChange}
          margin="normal"
        />
        {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          {userPassword === '' ? 'Set Password' : 'Submit'}
        </Button>
      </Box>
    </Modal>
  );
};

export default PasswordModal;
