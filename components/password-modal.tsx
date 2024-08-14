import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import getDocument from '../firestore/getDocument';
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

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

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
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
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '70%', sm: '80%', md: 400 },
          maxWidth: 600,
          bgcolor: 'background.paper',
          border: '1px solid #ccc',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
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
            required
          />
        )}

        <FormControl variant='outlined' fullWidth required margin='normal'>
          <InputLabel htmlFor='outlined-adornment-password'>
            {userPassword === '' ? 'New Password' : 'Password'}
          </InputLabel>
          <OutlinedInput
            id='outlined-adornment-password'
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
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
            label={userPassword === '' ? 'New Password' : 'Password'}
          />
        </FormControl>

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
