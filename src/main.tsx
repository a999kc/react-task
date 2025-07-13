import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {createTheme, ThemeProvider} from '@mui/material'
import { BrowserRouter } from 'react-router-dom'


const theme = createTheme({
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
  
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
