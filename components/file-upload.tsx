import React, { useState, useCallback } from 'react';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import {
  Button,
  styled,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { v4 as uuidv4 } from 'uuid';
import Cropper from 'react-easy-crop';

// AWS S3 Configuration
export const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
  },
});

const createImage = (url: string) => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.src = url;
    image.onload = () => resolve(image);
    image.onerror = (error) => reject(error);
  });
};

const getRadianAngle = (degreeValue: number) => (degreeValue * Math.PI) / 180;

const getCroppedImg = async (imageSrc: string, pixelCrop: any, rotation = 0) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const { width, height } = image;
  const rotRad = getRadianAngle(rotation);

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(rotRad);
  ctx.translate(-canvas.width / 2, -canvas.height / 2);
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise<Blob | null>((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob);
    }, 'image/jpeg');
  });
};

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

const aspectRatios = {
  profilePictureUrl: 1, // 1:1 aspect ratio
  bannerUrl: 1080 / 250, // Custom aspect ratio
  backgroundUrl: null, // Full size, no fixed aspect ratio
};

const dimensions = {
  profilePictureUrl: { width: 320, height: 320 },
  bannerUrl: { width: 1080, height: 250 },
  backgroundUrl: { width: 10000, height: 10000 }, // Large values for full size
};

const FileUpload = ({
  onUpload,
  imageType,
}: {
  onUpload: (url: string) => void;
  imageType: 'profilePictureUrl' | 'bannerUrl' | 'backgroundUrl';
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const aspectRatio = aspectRatios[imageType];
  const cropDimensions = dimensions[imageType];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        setError('Invalid file type. Please upload PNG, JPEG, or JPG images.');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError('File size exceeds 5 MB.');
        return;
      }

      setError('');
      setFile(file);
      setImageSrc(URL.createObjectURL(file));
      setOpen(true); // Open the crop modal
    }
  };

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropSave = async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      );
      await handleUpload(croppedImage);
      setOpen(false); // Close the crop modal
    } catch (e) {
      console.error(e);
      setError('Crop failed. Please try again.');
    }
  };

  const handleUpload = async (imageBlob: Blob | null) => {
    if (!imageBlob) return;

    setUploading(true);
    const fileName = `${uuidv4()}`;
    const params = {
      Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
      Key: fileName,
      Body: imageBlob,
      ContentType: 'image/jpeg',
    };

    try {
      const result = await s3Client.send(new PutObjectCommand(params));
      console.log(result);

      const fileUrl = `https://${params.Bucket}.s3.amazonaws.com/${fileName}`;
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

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth='md'
        fullWidth
      >
        <DialogTitle>Crop Image</DialogTitle>
        <DialogContent>
          {imageSrc && (
            <div
              style={{
                position: 'relative',
                height: imageType === 'backgroundUrl' ? 'auto' : 400,
                width: imageType === 'backgroundUrl' ? 'auto' : 400
              }}
            >
              <Cropper
                image={imageSrc}
                crop={crop}
                rotation={rotation}
                zoom={zoom}
                aspect={aspectRatio} // Set aspect ratio based on imageType
                onCropChange={setCrop}
                onRotationChange={setRotation}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                style={{ containerStyle: { width: cropDimensions.width, height: cropDimensions.height } }}
              />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleCropSave} color='primary'>
            Save
          </Button>
        </DialogActions>
      </Dialog>

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
