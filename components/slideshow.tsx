// components/Slideshow.tsx
import React, { useState, useEffect } from 'react';
import { Box, IconButton, Card, CardMedia } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

interface SlideshowProps {
  slides: string[]; // Array of image URLs
}

const Slideshow: React.FC<SlideshowProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 3000); // Change slide every 3 seconds
    return () => clearInterval(timer);
  }, [slides.length]); // Re-run effect if slides length changes

  if (slides.length === 0) return null; // Return null if no slides are provided

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '400px' }}>
      <Card sx={{ width: '100%', height: '100%', boxShadow: 'none', overflow: 'hidden' }}>
        <CardMedia
          component='img'
          image={slides[currentIndex]}
          alt={`Slide ${currentIndex}`}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center', // Center the image in case it is larger than the container
          }}
        />
      </Card>
      <IconButton
        onClick={prevSlide}
        sx={{
          position: 'absolute',
          top: '50%',
          left: 0,
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
        }}
      >
        <ArrowBackIosIcon />
      </IconButton>
      <IconButton
        onClick={nextSlide}
        sx={{
          position: 'absolute',
          top: '50%',
          right: 0,
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default Slideshow;
