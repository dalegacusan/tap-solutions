import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Button, styled } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { storage } from '../firebase/config';

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

const FileUpload = ({ onUpload }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if the file type is allowed
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        setError('Invalid file type. Please upload PNG, JPEG, or JPG images.');
        return;
      }

      setError(''); // Clear previous errors
      handleUpload(file);
    }
  };

  const handleUpload = (file) => {
    setUploading(true);
    const fileRef = ref(storage, `files/${file.name}`); // Create a reference to the file
    uploadBytes(fileRef, file)
      .then((snapshot) => {
        return getDownloadURL(fileRef);
      })
      .then((downloadURL) => {
        setUploading(false);
        if (onUpload) {
          onUpload(downloadURL); // Call the callback with the URL
        }
      })
      .catch((error) => {
        setUploading(false);
        setError('Upload failed. Please try again.');
      });
  };

  return (
    <div>
      <Button
        fullWidth
        component='label'
        variant='outlined'
        startIcon={<CloudUploadIcon />}
      >
        Upload
        <VisuallyHiddenInput
          type='file'
          accept='image/png, image/jpeg, image/jpg'
          onChange={handleFileChange}
        />
      </Button>
      {uploading && <p>Uploading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default FileUpload;
