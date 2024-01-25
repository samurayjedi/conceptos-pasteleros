import { Dimensions, Platform, PixelRatio } from 'react-native';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const PIWI_THEME = {
  palette: {
    mode: 'light',
    common: {
      black: '#000',
      white: '#fff',
    },
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#fff',
    },
    secondary: {
      main: '#f26c20',
      light: '#ffa738',
      dark: '#e8531e',
      contrastText: '#fff',
    },
    error: {
      main: '#d32f2f',
      light: '#ef5350',
      dark: '#c62828',
      contrastText: '#fff',
    },
    warning: {
      main: '#ed6c02',
      light: '#ff9800',
      dark: '#e65100',
      contrastText: '#fff',
    },
    info: {
      main: '#0288d1',
      light: '#03a9f4',
      dark: '#01579b',
      contrastText: '#fff',
    },
    success: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20',
      contrastText: '#fff',
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      A100: '#f5f5f5',
      A200: '#eeeeee',
      A400: '#bdbdbd',
      A700: '#616161',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
    ripple: {
      background: '#400000', // dark theme: #40ffff
      opacity: 0.22,
    },
    paper: '#ffffff',
    divider: 'rgba(0, 0, 0, 0.15)',
  },
  spacing: (piwi: number) => piwi * 8,
  iconButton: {
    small: 18,
    medium: 24,
    large: 32,
  },
  input: {
    standard: {
      borderColor: 'rgba(0, 0, 0, 0.42)',
      background: '#ffffff',
    },
    outlined: {
      borderColor: 'rgba(0, 0, 0, 0.23)',
      background: '#ffffff',
    },
    filled: {
      borderColor: 'rgba(0, 0, 0, 0.42)',
      background: 'rgba(0, 0, 0, 0.06)',
    },
  },
  typography: {
    h1: {
      fontWeight: '300',
      fontSize: normalize(32),
      // lineHeight: 1.167,
      // letterSpacing: '-0.01562em',
    },
    h2: {
      fontWeight: '300',
      fontSize: normalize(28),
      // lineHeight: 1.2,
      // letterSpacing: '-0.00833em',
    },
    h3: {
      fontWeight: '400',
      fontSize: normalize(24),
      // lineHeight: 1.167,
      // letterSpacing: '0em',
    },
    h4: {
      fontWeight: '400',
      fontSize: normalize(22),
      // lineHeight: 1.235,
      // letterSpacing: '0.00735em',
    },
    h5: {
      fontWeight: '400',
      fontSize: normalize(20),
      // lineHeight: 1.334,
      // letterSpacing: '0em',
    },
    h6: {
      fontWeight: '500',
      fontSize: normalize(18),
      // lineHeight: 1.6,
      // letterSpacing: '0.0075em',
    },
    subtitle1: {
      fontWeight: '400',
      fontSize: normalize(15),
      // lineHeight: 1.75,
      // letterSpacing: '0.00938em',
    },
    subtitle2: {
      fontWeight: '500',
      fontSize: normalize(12),
      // lineHeight: 1.57,
      // letterSpacing: '0.00714em',
    },
    body1: {
      fontWeight: '400',
      fontSize: normalize(15),
      // lineHeight: 1.5,
      // letterSpacing: '0.00938em',
    },
    body2: {
      fontWeight: 'normal',
      fontSize: normalize(14),
      // lineHeight: 1.43,
      // letterSpacing: '0.01071em',
    },
    button: {
      fontWeight: '700',
      fontSize: normalize(12),
      // lineHeight: 1.75,
      letterSpacing: 1,
      textTransform: 'uppercase',
    },
    caption: {
      fontWeight: '700',
      fontSize: normalize(12),
      // lineHeight: 1.66,
      // letterSpacing: '0.03333em',
    },
    overline: {
      fontWeight: '400',
      fontSize: normalize(13),
      // lineHeight: 2.66,
      letterSpacing: 1.1,
      textTransform: 'uppercase',
    },
  },
} as const;

export default PIWI_THEME;

export function normalize(size: number) {
  // based on iphone 5s's scale
  const newSize = size * (SCREEN_WIDTH / 320);
  let piwi = 0;
  if (Platform.OS === 'ios') {
    piwi = Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    piwi = Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }

  return piwi;
}

export type PiwiTheme = typeof PIWI_THEME;
