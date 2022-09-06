import { useEffect } from 'react';
import { Box, TextField, Button, Container, Typography } from '@mui/material';
import { useSignupMutation } from '../redux/contacts/contacts-api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signup, { isLoading, isError, error }] = useSignupMutation();

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        return setName(value);
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      default:
        return;
    }
  };

  useEffect(() => {
    isError && toast.error('Sign up failed. Please, try again!');
    console.log('Sign up failed. Please, try again!' + error);
  }, [isError, error]);

  const handleSubmit = e => {
    e.preventDefault();
    signup({ name, email, password });
    !isError && toast.success('You are successfully signed up!') && reset();
  };

  const reset = () => {
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <Container sx={{mt:'7rem'}}>
      <Typography variant="h6" component="h1" sx={{ textAlign: 'center' }}>
        Sign up
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
          label="Name"
          variant="standard"
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
        />
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
          Register
        </Button>
        <Typography
          variant="p"
          sx={{
            pt: '1rem',
          }}
        >
          <Link to="/login">Login</Link>
        </Typography>
      </Box>
    </Container>
  );
};
