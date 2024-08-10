import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import getDocument from '../firestore/getDocument';

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #ccc',
  boxShadow: 24,
  p: 4,
};

interface PasswordModalProps {
  open: boolean;
  onClose: () => void;
  onPasswordCorrect: () => void;
  userPassword?: string; // Optional prop
  setUserPassword?: (password: string) => void; // Optional prop
  username: string;
  setIsLoggedIn?: (isLoggedIn: boolean) => void;
}

const PasswordModal: React.FC<PasswordModalProps> = ({
  open,
  onClose,
  setUserPassword,
  onPasswordCorrect,
  setIsLoggedIn,
  userPassword,
  username,
}) => {
  const [password, setPassword] = React.useState('');
  const [enteredUsername, setEnteredUsername] = React.useState(username || '');
  const [error, setError] = React.useState<string | null>(null);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredUsername(event.target.value);
  };

  const handleSubmit = async () => {
    if (username === '' && userPassword === '') {
      // Check the document in the 'administrators' collection and verify the password
      try {
        const { result: user, error: fetchError } = await getDocument(
          'administrators',
          enteredUsername
        );

        if (fetchError) {
          setError(fetchError);
          return;
        }

        // Verify password
        const { data } = await axios.post('/api/verify-password', {
          enteredPassword: password,
          accountPassword: user.password,
        });

        if (data.success) {
          if (setIsLoggedIn) {
            setIsLoggedIn(true);
          }

          onPasswordCorrect();
        } else {
          setError('Incorrect password. Please try again.');
        }
      } catch (err) {
        const errorMessage =
          (err as any).response?.data?.error ||
          'Error verifying password. Please try again.';
        setError(errorMessage);
      }
    } else {
      if (userPassword === '') {
        // User hasn't set up a password yet
        if (password) {
          try {
            await axios.post('/api/set-password', {
              username: enteredUsername,
              password,
            });
            onPasswordCorrect();
          } catch (err) {
            const errorMessage =
              (err as any).response?.data?.error ||
              'Error setting up the password. Please try again.';
            setError(errorMessage);
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
            if (setIsLoggedIn) {
              setIsLoggedIn(true);
            }

            onPasswordCorrect();
          } else {
            setError('Incorrect password. Please try again.');
          }
        } catch (err) {
          const errorMessage =
            (err as any).response?.data?.error ||
            'Error verifying password. Please try again.';
          setError(errorMessage);
        }
      }
    }
  };

  // Prevent closing the modal by clicking outside or pressing ESC
  const handleClose = (event: React.MouseEvent | React.KeyboardEvent) => {
    event.stopPropagation(); // Prevents closing on click outside
  };

  return (
    <Modal
      open={open}
      onClose={() => {}}
      aria-labelledby='password-modal-title'
      aria-describedby='password-modal-description'
      disableAutoFocus
      disableEnforceFocus
    >
      <Box
        sx={modalStyle}
        onClick={handleClose}
        onKeyDown={(e) => e.key === 'Escape' && e.preventDefault()}
      >
        <Typography id='password-modal-title' variant='h6' component='h2'>
          {username === '' && userPassword === ''
            ? 'Enter Credentials'
            : userPassword === ''
            ? 'Set Up Your Password'
            : 'Enter Password'}
        </Typography>
        {userPassword === '' && !username && (
          <TextField
            fullWidth
            label='Username'
            variant='outlined'
            value={enteredUsername}
            onChange={handleUsernameChange}
            margin='normal'
          />
        )}
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
          style={{ backgroundColor: '#FF914D' }}
        >
          {username === '' && userPassword === ''
            ? 'Submit'
            : userPassword === ''
            ? 'Set Password'
            : 'Submit'}
        </Button>
      </Box>
    </Modal>
  );
};

export default PasswordModal;
