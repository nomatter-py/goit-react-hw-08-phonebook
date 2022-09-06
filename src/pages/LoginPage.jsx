import { useEffect } from 'react';
import { Box, TextField, Button, Container, Typography } from '@mui/material';
import { useLoginMutation } from '../redux/contacts/contacts-api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading, isError, error }] = useLoginMutation();

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      default:
        return;
    }
  };

  useEffect(() => {
    isError && toast.error('Login failed. Please, try again!');
    console.log('Login failed. Please, try again!' + error);
  }, [error, isError]);

  const handleSubmit = e => {
    e.preventDefault();
    login({ email, password });
    !isError && reset();
  };

  const reset = () => {
    setEmail('');
    setPassword('');
  };

  return (
    <Container sx={{ mt: '7rem' }}>
      <Typography variant="h6" component="h1" sx={{ textAlign: 'center' }}>
        Login
      </Typography>
      <Box
        component="form"
        sx={{
          display: 'flex',

          margin: 'auto',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '20rem',
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          required
          label="Email"
          variant="standard"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <TextField
          sx={{ mb: '1rem' }}
          required
          label="Password"
          variant="standard"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />

        <Button variant="outlined" type="submit" disabled={isLoading}>
          Login
        </Button>

        <Typography
          variant="p"
          sx={{
            pt: '1rem',
          }}
        >
          <Link to="/register">Register</Link>
        </Typography>
      </Box>
    </Container>
  );
};
