import { useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '/UserContext.jsx';
import axios from 'axios';

export default function LogoutView() {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    // Remove auth data from local storage
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    // Clear auth token from Axios
    delete axios.defaults.headers.common['Authorization'];

    // Clear auth context
    setUser(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Navigate to="/login" />;
}
