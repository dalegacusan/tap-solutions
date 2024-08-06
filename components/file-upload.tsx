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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleUpload = (file) => {
    setUploading(true);
    const fileRef = ref(storage, `files/${file.name}`); // Create a reference to the file
    uploadBytes(fileRef, file)
      .then((snapshot) => {
        console.log('Uploaded a blob or file!', snapshot);
        return getDownloadURL(fileRef);
      })
      .then((downloadURL) => {
        setUploading(false);
        console.log('File available at', downloadURL);
        if (onUpload) {
          onUpload(downloadURL); // Call the callback with the URL
        }
      })
      .catch((error) => {
        console.error('Upload failed:', error);
        setUploading(false);
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
        <VisuallyHiddenInput type='file' onChange={handleFileChange} />
      </Button>
      {uploading && <p>Uploading...</p>}
    </div>
  );
};

export default FileUpload;
