import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { NavBar } from 'components/NavBar/NavBar';
import { AppBar, Container, Toolbar, Typography } from '@mui/material';

export const Layout = () => {
  return (
    <>
      <AppBar position="fixed">
        <Container fixed maxWidth="xl">
          <Toolbar>
            <Typography
              variant="h3"
              sx={{
                mr: 2,
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
              }}
            >
              Phonebook
            </Typography>
            <NavBar />
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
      <ToastContainer />
    </>
  );
};
