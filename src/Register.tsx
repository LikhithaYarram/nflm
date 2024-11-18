import React, { useState, ChangeEvent, FormEvent } from "react";
import { TextField, Button, Box, Typography, Container, FormHelperText, InputAdornment } from "@mui/material";
import { Email as EmailIcon, Person as PersonIcon, Lock as LockIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Link } from "@mui/material";
import Landing from './Landing';

const Register = () => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Reset error state
    setError("");

    // Basic validations
    if (formValues.password !== formValues.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (formValues.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    // Submit form (e.g., send data to an API)
    console.log("Form submitted successfully!", formValues);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0c2d48 0%, #2980b9 100%)',
      }}
    >
      {/* Left Section using Landing component */}
      {/* <Box sx={{ flex: 1, display: { xs: 'none', md: 'block' } }}> */}
        <Landing />
      {/* </Box> */}

      {/* Right Section - Updated styling to match first image */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          background: 'linear-gradient(to left, #00416A, #E4E5E6)',
          p: 4,
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '450px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 4,
            borderRadius: '10px',
            bgcolor: 'white',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography variant="h5" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <TextField
              label="Email"
              name="email"
              fullWidth
              margin="normal"
              variant="outlined"
              value={formValues.email}
              onChange={handleChange}
              required
              error={!!error}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: '#72BCD4' }} />
                  </InputAdornment>
                ),
                sx: { bgcolor: '#f8f9fa' }
              }}
              sx={{ 
                mb: 1.5,
                '& .MuiOutlinedInput-root': {
                  bgcolor: '#f8f9fa',
                  '&:hover': {
                    bgcolor: '#f0f1f2',
                  },
                  '& input': {
                    padding: '10px 14px',
                  }
                }
              }}
            />
            <TextField
              label="First Name"
              name="firstName"
              fullWidth
              margin="normal"
              variant="outlined"
              value={formValues.firstName}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: '#72BCD4' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ 
                mb: 1.5,
                '& .MuiOutlinedInput-root': {
                  bgcolor: '#f8f9fa',
                  '&:hover': {
                    bgcolor: '#f0f1f2',
                  },
                  '& input': {
                    padding: '10px 14px',
                  }
                }
              }}
            />
            <TextField
              label="Last Name"
              name="lastName"
              fullWidth
              margin="normal"
              variant="outlined"
              value={formValues.lastName}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: '#72BCD4' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ 
                mb: 1.5,
                '& .MuiOutlinedInput-root': {
                  bgcolor: '#f8f9fa',
                  '&:hover': {
                    bgcolor: '#f0f1f2',
                  },
                  '& input': {
                    padding: '10px 14px',
                  }
                }
              }}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              value={formValues.password}
              onChange={handleChange}
              required
              error={!!error}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: '#72BCD4' }} />
                  </InputAdornment>
                ),
                sx: { bgcolor: '#f8f9fa' }
              }}
              sx={{ 
                mb: 1.5,
                '& .MuiOutlinedInput-root': {
                  bgcolor: '#f8f9fa',
                  '&:hover': {
                    bgcolor: '#f0f1f2',
                  },
                  '& input': {
                    padding: '10px 14px',
                  }
                }
              }}
            />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              value={formValues.confirmPassword}
              onChange={handleChange}
              required
              error={!!error}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: '#72BCD4' }} />
                  </InputAdornment>
                ),
                sx: { bgcolor: '#f8f9fa' }
              }}
              sx={{ 
                mb: 1.5,
                '& .MuiOutlinedInput-root': {
                  bgcolor: '#f8f9fa',
                  '&:hover': {
                    bgcolor: '#f0f1f2',
                  },
                  '& input': {
                    padding: '10px 14px',
                  }
                }
              }}
            />
            {error && (
              <FormHelperText error sx={{ mb: 2 }}>{error}</FormHelperText>
            )}
            
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                background: 'linear-gradient(45deg, #E4E5E6,#00416A)',
                color: 'black',
                '&:hover': {
                  background: 'linear-gradient(45deg, #72BCD4, #72BCD4)',
                },
                mb: 2,
                py: 1,
                borderRadius: '5px',
                textTransform: 'none',
                fontSize: '1rem',
              }}
            >
              Sign Up
            </Button>
          </form>
          <Box sx={{ width: "100%", textAlign: "center", mt: 2 }}>
            <Typography variant="body1">
              Already have an account?{' '}
              <Link
                component="button"
                onClick={() => navigate('/login')}
                sx={{
                  color: '#2980b9',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Sign In
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
