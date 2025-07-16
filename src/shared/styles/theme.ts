import { createTheme } from '@mui/material';

const themeOptions = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f4f6f8',
      paper: '#fff',
    },
    text: {
      primary: '#1a1a1a',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          background: '#f8f9fa',
          borderBottom: '2px solid #495057',
          mb: 3,
          transition: 'all 0.3s ease',
          '& .MuiToolbar-root': {
            transition: 'inherit',
          },
        },
      },
      defaultProps: {
        position: 'static',
        elevation: 0,
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {},
      },
      defaultProps: {},
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          margin: '0 auto',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          py: 1,
          px: 0,

          '@media (max-width: 900px)': {
            flexDirection: 'column',
            gap: 0,
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#495057',
          fontWeight: 600,
          letterSpacing: 0.5,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          variant: 'outlined',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          border: '2px solid #495057',
          borderRadius: 4,
          // sx={{}}
        },
      },
    },
    MuiStack: {
      styleOverrides: {
        root: {
          mb: 2,
        },
      },
      defaultProps: {
        direction: 'row',
        spacing: { xs: 0, md: 2 },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          color: 'white',
          fontWeight: '600',
          size: 'medium',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '6px 16px',
          '&.MuiButton-root': {
            justifyContent: 'center',
            alignItems: 'center',
          },
          width: '100%',

          border: '2px solid #495057',
          px: 3,
          py: 1,
          backgroundColor: 'inherit',
          color: '#495057',
          fontWeight: 600,
          borderRadius: 8,

          whiteSpace: 'nowrap',
          '&:hover': {
            backgroundColor: '#e8590c',
            color: 'white',
            transform: 'translateY(-2px)',
            border: '2px solid #e8590c',
          },
          transition: 'all 0.2s ease',
        },
      },
    },
  },
});

export const theme = createTheme(themeOptions);
