import React, {useState} from 'react';
import Banner from './components/Banner';
import Dashboard from './components/Dashboard';
import { Container, Typography, Box, CssBaseline, Paper, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#E11D48', // hot pink
    },
    secondary: {
      main: '#33CC33', // bright green
    },
    background: {
      paper: '#FFFFFF', // white
    },
    text: {
      primary: '#000000', // black
      secondary: '#666666', // dark gray
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#E11D48', // bright orange
    },
    secondary: {
      main: '#8BC34A', // bright yellow-green
    },
    background: {
      paper: '#333333', // dark gray
    },
    text: {
      primary: '#FFFFFF', // white
      secondary: '#CCCCCC', // light gray
    },
  },
});

const App = () => {
  const [theme, setTheme] = useState(darkTheme);

  const handleThemeChange = () => {
    setTheme(theme.palette.mode === 'light' ? darkTheme : lightTheme);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ paddingTop: 4, paddingBottom: 4 }}>
        <Paper elevation={3} sx={{ padding: 4, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Banner Management System
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleThemeChange}
            sx={{ marginTop: 2 }}
          >
            {theme.palette.mode === 'light' ? 'Dark Mode' : 'Light Mode'}
          </Button>
        </Paper>
        <Box display="flex" flexDirection="column" alignItems="center" marginTop={4} gap={4}>
          <Box sx={{ width: '100%', maxWidth: 600 }}>
            <Banner theme={theme} />
          </Box>
          <Box sx={{ width: '100%', maxWidth: 600 }}>
            <Dashboard theme={theme} />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;