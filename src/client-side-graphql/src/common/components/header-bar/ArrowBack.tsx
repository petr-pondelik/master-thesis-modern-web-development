import { ArrowBack } from '@mui/icons-material';
import { IconButton } from '@mui/material';

export const HeaderArrowBack = () => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }} onClick={handleBack}>
      <ArrowBack/>
    </IconButton>
  );
};