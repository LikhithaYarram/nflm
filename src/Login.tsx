import React, { useState } from 'react';
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  Link,
  InputAdornment,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { AccountCircle, Lock } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Landing from './Landing';

const DEFAULT_CREDENTIALS = {
  username: 'John Doe',
  password: 'demo123',
};

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (
      credentials.username === DEFAULT_CREDENTIALS.username &&
      credentials.password === DEFAULT_CREDENTIALS.password
    ) {
      if (rememberMe) {
        localStorage.setItem('rememberMe', JSON.stringify(true));
      } else {
        localStorage.removeItem('rememberMe');
      }
      localStorage.setItem(
        'user',
        JSON.stringify({ username: credentials.username, isLoggedIn: true })
      );
      navigate('/home');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        height: '100vh',
        background: 'linear-gradient(to right, #00416A, #E4E5E6)',
      }}
    >
      <Landing />

      {/* Right Section */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
          background: 'linear-gradient(to left, #00416A, #E4E5E6)',
          padding: 4,
        }}
      >
        <Card sx={{ p: 4, width: '100%', maxWidth: 400, borderRadius: '16px', }}>
          <Typography variant="h5" sx={{ textAlign: 'center', mb: 3, fontWeight: 'bold' }}>
            Welcome to <br></br>Nutrition Facts Label Maker
          </Typography>
          {error && (
            <Typography color="error" align="center" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          {/* Username Field */}
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            margin="normal"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle style={{ color: '#72BCD4' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#72BCD4',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#30839F',
              },
            }}
          />
          {/* Password Field */}
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock style={{ color: '#72BCD4' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#72BCD4',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#30839F',
              },
            }}
          />
          {/* Remember Me */}
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                sx={{
                  color: '#72BCD4',
                  borderRadius: '50%',
                  '&.Mui-checked': {
                    color: '#00416A',
                  },
                }}
              />
            }
            label="Remember Me"
            sx={{ mt: 2 }}
          />
          <Button
            fullWidth
            variant="contained"
            onClick={handleLogin}
            sx={{
              mt: 3,
              background: 'linear-gradient(45deg, #E4E5E6,#00416A)',
              color: 'black',
              '&:hover': {
                background: 'linear-gradient(45deg, #72BCD4, #72BCD4)',
              },
            }}
          >
            Sign In
          </Button>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don’t have an account?{' '}
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate('/register')}
              sx={{
                color: '#72BCD4',
                fontWeight: 'bold',
                textDecoration: 'none',
              }}
            >
              Sign Up
            </Link>
          </Typography>
        </Card>
      </Box>
    </Box>
  );
};

export default Login;
