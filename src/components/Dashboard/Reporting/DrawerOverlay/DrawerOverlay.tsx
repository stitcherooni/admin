import React from 'react';
import Box from '@mui/material/Box';

interface DrawerOverlayProps {
  handleClick: (e: React.SyntheticEvent) => void
  handleKeydown: (e: React.SyntheticEvent) => void
  children: React.ReactNode;
}

const DrawerOverlay = (props: DrawerOverlayProps) => {
  const { handleClick, handleKeydown, children } = props;
  return (
    <Box
      sx={{
        transition: 'all 0.3s ease-in-out',
      }}
      role="presentation"
      onClick={handleClick}
      onKeyDown={handleKeydown}
    >
      {children}
    </Box>
  );
};

export default DrawerOverlay;
