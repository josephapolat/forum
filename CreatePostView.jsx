import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CreatePostView.module.css';

export default function CreatePostView() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState(null);


  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login', { state: { from: '/create-post' } });
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  const handleSubmit = async () => {
    if (!title.trim() || !body.trim()) {
      setError('Title and body cannot be empty.');
      return;
    }

    try {
      const response = await fetch('http://localhost:9000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ title, body }),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      const newPost = await response.json();
      console.log('Post created:', newPost);

      navigate(`/posts/${newPost.postId}`);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className={styles.createPostContainer}>
      <h1>Create a New Post</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className={styles.inputGroup}>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title"
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="body">Body:</label>
        <textarea
          id="body"
          rows={6}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your post here..."
        />
      </div>

      <button onClick={handleSubmit} className={styles.submitButton}>
        Submit Post
      </button>
    </div>
  );
}
