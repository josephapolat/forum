import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import AuthService from '../../services/AuthService';
import styles from './ProfileView.module.css';

export default function ProfileView() {
  const { username } = useParams();
  const { user } = useContext(UserContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    if (!user && !username) {
      setLoading(false);
      setError('Please log in to view your profile.');
      return;
    }


    const fetchProfile = username
      ? AuthService.getProfileByUsername(username)
      : AuthService.getProfile();

    fetchProfile
      .then(res => setProfile(res.data))
      .catch(err => {
        console.error('Error fetching profile:', err);
        setError('Unable to load profile.');
      })
      .finally(() => setLoading(false));
  }, [user, username]);

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div>{error}</div>;
  if (!profile) return <div>Profile not found.</div>;

  return (
    <div className={styles.profileContainer}>
      <h1 className={styles.nickname}>{profile.nickname}</h1>
      <h3 className={styles.username}>
        @{username || user?.username}
      </h3>
      <h5 className={styles.location}>{profile.location || 'US'}</h5>
      <p className={styles.bio}>{profile.bio}</p>
    </div>
  );
}
