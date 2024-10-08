// components/Content.tsx
import React from 'react';
import { Box } from '@mui/material';

// Define the type for props to accept children
interface ContentProps {
  children: React.ReactNode;
  backgroundColor?: string;
}

// Define the Content component
const Content: React.FC<ContentProps> = ({ children, backgroundColor }) => (
  <Box
    sx={{
      flex: '1',
      backgroundColor: backgroundColor ? backgroundColor : '#FFFFFF',
      paddingBottom: '60px',
      px: { xs: 2, sm: 4, md: 8, lg: 16 },
      py: { xs: 4, sm: 6, md: 8 },
    }}
  >
    {children} {/* Render children here */}
  </Box>
);

export default Content;
