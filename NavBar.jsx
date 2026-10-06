import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import styles from './NavBar.module.css';

export default function NavBar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    navigate('/');
  };

  return (
    <nav>
      <input type="text" />

      <NavLink to="/">
        <div className={styles.searchButton}>search</div>
      </NavLink>

      <NavLink to="/">
        <div className={styles.homeButton}>
          <span className={styles.text}>HOME</span>
        </div>
      </NavLink>

      {!user && (
        <NavLink to="/login">
          <div className={styles.loginButton}>
            <span className={styles.text}>LOGIN</span>
          </div>
        </NavLink>
      )}

      {user && (
        <>
          <NavLink to="/profile">
            <div className={styles.profileButton}>
              <span className={styles.text}>PROFILE</span>
            </div>
          </NavLink>

          <div
            className={styles.loginButton} // reuse style or create new logoutButton
            onClick={handleLogout}
            style={{ cursor: 'pointer' }}
          >
            <span className={styles.text}>LOGOUT</span>
          </div>
        </>
      )}
    </nav>
  );
}
