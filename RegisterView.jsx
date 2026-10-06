import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Notification from '../../components/Notification/Notification';
import AuthService from '../../services/AuthService';

import styles from './RegisterView.module.css';


const countries = [
  "AF","AX","AL","DZ","AS","AD","AO","AI","AQ","AG","AR","AM","AW","AU","AT","AZ",
  "BS","BH","BD","BB","BY","BE","BZ","BJ","BM","BT","BO","BQ","BA","BW","BV","BR",
  "IO","BN","BG","BF","BI","CV","KH","CM","CA","KY","CF","TD","CL","CN","CX","CC",
  "CO","KM","CG","CD","CK","CR","CI","HR","CU","CW","CY","CZ","DK","DJ","DM","DO",
  "EC","EG","SV","GQ","ER","EE","ET","FK","FO","FJ","FI","FR","GF","PF","TF","GA",
  "GM","GE","DE","GH","GI","GR","GL","GD","GP","GU","GT","GG","GN","GW","GY","HT",
  "HM","VA","HN","HK","HU","IS","IN","ID","IR","IQ","IE","IM","IL","IT","JM","JP",
  "JE","JO","KZ","KE","KI","KP","KR","KW","KG","LA","LV","LB","LS","LR","LY","LI",
  "LT","LU","MO","MG","MW","MY","MV","ML","MT","MH","MQ","MR","MU","YT","MX","FM",
  "MD","MC","MN","ME","MS","MA","MZ","MM","NA","NR","NP","NL","NC","NZ","NI","NE",
  "NG","NU","NF","MK","MP","NO","OM","PK","PW","PS","PA","PG","PY","PE","PH","PN",
  "PL","PT","PR","QA","RE","RO","RU","RW","BL","SH","KN","LC","MF","PM","VC","WS",
  "SM","ST","SA","SN","RS","SC","SL","SG","SX","SK","SI","SB","SO","ZA","GS","SS",
  "ES","LK","SD","SR","SJ","SE","CH","SY","TW","TJ","TZ","TH","TL","TG","TK","TO",
  "TT","TN","TR","TM","TC","TV","UG","UA","AE","GB","US","UM","UY","UZ","VU","VE",
  "VN","VG","VI","WF","EH","YE","ZM","ZW"
];

export default function RegisterView() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    location: '',
    role: 'user',
  });

  const [notification, setNotification] = useState(null);

  function handleChange(event) {
    const { id, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [id]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (user.password !== user.confirmPassword) {
      setNotification({ type: 'error', message: 'Password & Confirm Password do not match' });
      return;
    }

    AuthService.register(user)
      .then((response) => {
        if (response.status === 201) {
          setNotification({ type: 'success', message: 'Registration successful! Redirecting you to login page...' });
          setTimeout(() => navigate('/login'), 3000);
        }
      })
      .catch((error) => {
        const response = error.response;
        if (!response) {
          setNotification({ type: 'error', message: error.message });
        } else if (response.status === 400) {
          if (response.data.errors) {
            let msg = 'Validation error: ';
            for (let err of response.data.errors) {
              msg += `'${err.field}': ${err.defaultMessage}. `;
            }
            setNotification({ type: 'error', message: msg });
          } else {
            setNotification({ type: 'error', message: `Registration failed: ${response.data.message}` });
          }
        } else {
          setNotification({ type: 'error', message: `Registration failed: ${response.data.message}` });
        }
      });
  }

  return (
    <div id="register" className={styles.register}>
      <form onSubmit={handleSubmit}>
        <h1>Create Account</h1>

        <Notification notification={notification} clearNotification={() => setNotification(null)} />

        <div className={styles.registerForm}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={user.username}
            onChange={handleChange}
            required
            autoFocus
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            required
          />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={user.confirmPassword}
            onChange={handleChange}
            required
          />

          <label htmlFor="location">Location</label>
          <select id="location" value={user.location} onChange={handleChange} required>
            <option value="">Select country</option>
            {countries.map((code) => (
              <option key={code} value={code}>{code}</option>
            ))}
          </select>

          <div>
            <button type="submit">Create Account</button>
          </div>
        </div>

        <hr />
        Have an account? <Link to="/login">Sign in!</Link>
      </form>
    </div>
  );
}
