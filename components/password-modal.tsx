import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import axios from 'axios';

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
  userPassword: string; // This should be the hashed password
  username: string;
}

const PasswordModal: React.FC<PasswordModalProps> = ({
  open,
  onClose,
  onPasswordCorrect,
  userPassword,
  username,
}) => {
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async () => {
    if (userPassword === '') {
      // User hasn't set up a password yet
      if (password) {
        try {
          await axios.post('/api/set-password', {
            username,
            password,
          });
          onPasswordCorrect();
        } catch (err) {
          setError('Error setting up the password. Please try again.');
        }
      } else {
        setError('Please enter a password to set up your account.');
      }
    } else {
      // User has set up a password, verify it
      try {
        const { data } = await axios.post('/api/verify-password', {
          enteredPassword: password,
          accountPassword: userPassword,
        });
        if (data.success) {
          onPasswordCorrect();
        } else {
          setError('Incorrect password. Please try again.');
        }
      } catch (err) {
        setError('Error verifying password. Please try again.');
      }
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='password-modal-title'
      aria-describedby='password-modal-description'
    >
      <Box sx={modalStyle}>
        <Typography id='password-modal-title' variant='h6' component='h2'>
          {userPassword === '' ? 'Set Up Your Password' : 'Enter Password'}
        </Typography>
        <TextField
          fullWidth
          label={userPassword === '' ? 'New Password' : 'Password'}
          type='password'
          variant='outlined'
          value={password}
          onChange={handlePasswordChange}
          margin='normal'
        />
        {error && (
          <Typography color='error' sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        <Button
          variant='contained'
          color='primary'
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
