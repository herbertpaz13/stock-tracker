import { createTheme } from '@mui/material/styles';

const PRIMARY_COLOR = '#34D399';
const BACKGROUND_COLOR = '#0E1420';
const PAPER_COLOR = '#1A1F2E';
const BORDER_RADIUS = 16;

const customTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: PRIMARY_COLOR,
    },
    background: {
      default: BACKGROUND_COLOR,
      paper: PAPER_COLOR,
    },
  },
  shape: {
    borderRadius: BORDER_RADIUS,
  },
});

export default customTheme;