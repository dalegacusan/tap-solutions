import React from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface SocialMediaEditButtonProps {
  identifier: string;
  icon: React.ReactNode;
  label: string;
  isSocialMediaDefined: (identifier: string) => boolean;
  onClick: () => void;
}

const SocialMediaEditButton: React.FC<SocialMediaEditButtonProps> = ({
  identifier,
  icon,
  label,
  isSocialMediaDefined,
  onClick,
}) => {
  const theme = useTheme();

  const backgroundColor = isSocialMediaDefined(identifier)
    ? theme.palette.success.main
    : theme.palette.background.paper;

  const textColor = isSocialMediaDefined(identifier)
    ? theme.palette.grey[200]
    : 'inherit';

  return (
    <ListItemButton
      onClick={onClick}
      sx={{
        margin: '8px 0px',
        boxShadow: 1,
        borderRadius: '6px',
        backgroundColor,
        color: textColor,
        '&:hover': {
          backgroundColor: isSocialMediaDefined(identifier)
            ? theme.palette.success.dark
            : theme.palette.action.hover,
        },
      }}
    >
      <ListItemIcon sx={{ color: textColor }}>{icon}</ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

export default SocialMediaEditButton;
