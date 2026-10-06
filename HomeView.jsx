import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink, useNavigate } from 'react-router-dom';

import styles from './HomeView.module.css';

export default function HomeView() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:9000/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load posts');
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error loading posts:', err);
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  const handleCreatePost = () => {
    const user = localStorage.getItem('user');
    if (!user) {

      navigate('/login', { state: { from: '/create-post' } });
      return;
    }
    // Redirect to create post page
    navigate('/create-post');
  };

  if (isLoading) return <p>Loading posts...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div className={styles.postContainer}>
      <div style={{ marginBottom: '20px' }}>
        <button className={styles.createPostButton} onClick={handleCreatePost}>
          Create Post
        </button>
      </div>

      <h2>Recent Posts</h2>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map((post) => (
          <div key={post.postId} className={styles.post}>
            <NavLink to={`/posts/${post.postId}`}>
              <h3 className={styles.title}>{post.title}</h3>
            </NavLink>
            <NavLink to={`/profile/${post.author}`}>
              <h5 className={styles.author}>{post.author}</h5>
            </NavLink>
          </div>
        ))
      )}
    </div>
  );
}
