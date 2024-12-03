// src/theme.ts
import { enUS, frFR } from '@mui/material/locale'; // Import locales
import { createTheme } from '@mui/material/styles';

const locale = enUS;

const theme = createTheme(
{
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
  // You can add more customizations here, like palette, breakpoints, etc.
},
locale );

export default theme;
