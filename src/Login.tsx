import React, { useState } from 'react';
import { 
  Box, 
  Card, 
  TextField, 
  Button, 
  Typography, 
  IconButton,
  AppBar,
  Toolbar
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

// Default credentials - in a real app, these would be stored securely
const DEFAULT_CREDENTIALS = {
  username: 'John Doe',
  password: 'demo123'
};

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (credentials.username === DEFAULT_CREDENTIALS.username && 
        credentials.password === DEFAULT_CREDENTIALS.password) {
      // Store user info in localStorage
      localStorage.setItem('user', JSON.stringify({ 
        username: credentials.username,
        isLoggedIn: true 
      }));
      navigate('/home');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ backgroundColor: '#ADD8E6' }} elevation={1}>
        <Toolbar>
                    <Typography variant="h6" sx={{ ml: 2, color: 'black' }}>
            Login
          </Typography>
        </Toolbar>
      </AppBar>

      <Box 
        sx={{ 
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5'
        }}
      >
        <Card sx={{ p: 4, width: '100%', maxWidth: 400 }}>
          <Typography variant="h5" gutterBottom align="center">
            Sign In
          </Typography>
          
          {error && (
            <Typography color="error" align="center" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            margin="normal"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#ADD8E6',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#ADD8E6',
              },
            }}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#ADD8E6',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#ADD8E6',
              },
            }}
          />

          <Button
            fullWidth
            variant="contained"
            onClick={handleLogin}
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: '#ADD8E6',
              color: 'black',
              '&:hover': {
                backgroundColor: '#B0DAE9'
              }
            }}
          >
            Sign In
          </Button>

          {/* <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Default credentials:<br />
            Username: {DEFAULT_CREDENTIALS.username}<br />
            Password: {DEFAULT_CREDENTIALS.password}
          </Typography> */}
        </Card>
      </Box>
    </Box>
  );
};

export default Login; 
