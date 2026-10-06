import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Notification from '../../components/Notification/Notification';
import AuthService from '../../services/AuthService';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';

import styles from './LoginView.module.css';

export default function LoginView() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState(null);


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    const userData = {
      username: username,
      password: password
    };

    AuthService.login(userData)
      .then((response) => {
        const user = response.data.user;
        const token = response.data.token;


        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);

      er
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;


        setUser(user);


        navigate('/');
      })
      .catch((error) => {
        const message = error.response?.data?.message || 'Login failed.';
        setNotification({ type: 'error', message });
        console.log('Login error:', error);
      });
  }

  return (
    <div className={styles.signInContainer}>
      <Notification
        notification={notification}
        clearNotification={() => setNotification(null)}
      />
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h1>LOGIN</h1>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoFocus
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Sign In</button>
      </form>
      <hr />
      Need an account? <Link to="/register">Register!</Link>
    </div>
  );
}
