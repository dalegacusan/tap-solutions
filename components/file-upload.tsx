import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Button, styled, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { storage } from '../firebase/config';
import imageCompression from 'browser-image-compression';

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

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if the file type is allowed
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        setError('Invalid file type. Please upload PNG, JPEG, or JPG images.');
        return;
      }

      setError(''); // Clear previous errors

      // Compress the image
      try {
        const options = {
          maxSizeMB: 1, // Maximum size in MB
          useWebWorker: true, // Use a web worker for compression
        };

        const compressedFile = await imageCompression(file, options);
        handleUpload(compressedFile); // Handle upload after compression
      } catch (compressionError) {
        setError('Error compressing the image. Please try again.');
      }
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
      {uploading && (
        <Typography mt={2} style={{ fontStyle: 'italic' }}>
          Uploading...
        </Typography>
      )}
      {error && (
        <Typography style={{ color: 'red' }} mt={2}>
          {error}
        </Typography>
      )}
    </div>
  );
};

export default FileUpload;
