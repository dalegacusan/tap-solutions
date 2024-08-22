import React, { useState } from 'react';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { Button, styled, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library

// AWS S3 Configuration
export const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_REGION, // Replace with your region
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID, // Replace with your AWS access key ID
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY, // Replace with your AWS secret access key
  },
});

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
      // Check file size and type
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        setError('Invalid file type. Please upload PNG, JPEG, or JPG images.');
        return;
      }

      if (file.size > 5 * 1024 * 1024) { // 5 MB limit
        setError('File size exceeds 5 MB.');
        return;
      }

      setError('');
      handleUpload(file);
    }
  };

  const handleUpload = async (file) => {
    setUploading(true);
    const fileName = `${uuidv4()}`; // Generate UUID and append file name
    const params = {
      Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME, // Replace with your bucket name
      Key: fileName,
      Body: file,
      ContentType: file.type,
    };

    try {
      const result = await s3Client.send(new PutObjectCommand(params));
      console.log(result);

      const fileUrl = `https://${params.Bucket}.s3.amazonaws.com/${fileName}`; // Construct the file URL
      setUploading(false);
      if (onUpload) onUpload(fileUrl);
    } catch (err) {
      setUploading(false);
      setError('Upload failed. Please try again.');
    }
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
