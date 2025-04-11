import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Alert, Box, Typography } from '@mui/material';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email,
        password,
      }, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      });
      
      const { token, expires_at, user } = response.data.data;

      localStorage.setItem('token', token);
      localStorage.setItem('expires_at', expires_at);
      localStorage.setItem('user', JSON.stringify(user));

      navigate('/');
    } catch (err) {
      if (err.response && err.response.data?.errors) {
        const errorMessages = Object.values(err.response.data.errors).flat();
        setError(errorMessages[0] || 'Login failed. Please try again.');
      } else {
        setError('Something went wrong. Please try again.');
      }
      console.error(err);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleLogin}
      sx={{
        maxWidth: 400,
        margin: 'auto',
        mt: 8,
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: 'background.paper',
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Login
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TextField
        label="Email"
        type="email"
        fullWidth
        required
        margin="normal"
        value={email}
        autoComplete="email"
        inputProps={{
          inputMode: 'email',
          autoCapitalize: 'none',
          autoCorrect: 'off',
          spellCheck: 'false',
        }}
        onChange={(e) => setEmail(e.target.value.toLowerCase())}
      />

      <TextField
        label="Password"
        type="password"
        fullWidth
        required
        margin="normal"
        value={password}
        autoComplete="current-password"
        inputProps={{
          autoCapitalize: 'none',
          autoCorrect: 'off',
          spellCheck: 'false',
        }}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Login
      </Button>
    </Box>
  );
};

export default LoginPage;
