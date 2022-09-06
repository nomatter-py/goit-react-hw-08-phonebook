import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Layout } from './Layout/Layout';
import { LoginPage } from "../pages/LoginPage";
import { ContactsPage } from "../pages/ContactsPage";
import { SignUpPage } from "../pages/SignUpPage";
import PrivateRoute from '../routes/PrivateRoute';
import PublicRoute from '../routes/PublicRoute';
import { authSelectors } from "redux/auth/auth-slice";
import { useGetCurrentUserQuery } from "redux/contacts/contacts-api";
import 'react-toastify/dist/ReactToastify.css';


const App = () => {

  const hasToken = useSelector(authSelectors.getToken);
  const { isLoading } = useGetCurrentUserQuery
    (undefined, {
    skip: !hasToken,
    });
  
  if (isLoading) {
    return null;
  }

  return (
    
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/login"/>}/>
       <Route
          path="/register"
          element={
            <PublicRoute
              restricted
              redirectTo="/todos"
              component={<SignUpPage />}
            />
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute
              restricted
              redirectTo="/contacts"
              component={<LoginPage />}
            />
          }
        />
        <Route
          path="/contacts"
          element={
            <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
          }
        />
      </Route>
    </Routes>
    
  );
};

export default App;
