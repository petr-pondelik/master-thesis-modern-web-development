import { ArrowBack } from '@mui/icons-material';

export const HeaderArrowBack = () => {
  const handleBack = () => {
    window.history.back();
  };

  return <ArrowBack onClick={handleBack} />;
};

export default HeaderArrowBack;