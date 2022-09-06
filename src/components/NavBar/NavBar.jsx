import { useSelector } from 'react-redux';
import { authSelectors } from '../../redux/auth/auth-slice';
import { useLogoutMutation } from 'redux/contacts/contacts-api';
import { Typography, Box, Button } from '@mui/material';
import ExitToApp from '@mui/icons-material/ExitToAppOutlined';


export const NavBar = () => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const [userLogout] = useLogoutMutation();
  const name = useSelector(authSelectors.getUserName);
  return (
    isLoggedIn && (
      <Box sx={{display:'flex'}}>
        {' '}
        <Typography sx={{ p: 2, display: 'block' }}>{name}</Typography>
        <Button variant="outlined" type="submit" sx={{ color: 'white' }} onClick={() => userLogout(null)}>
          <ExitToApp />
          Log out
        </Button>
      </Box>
    )
  );
};
