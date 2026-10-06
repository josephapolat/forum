import { useState, useEffect } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import ReplyBox from '../../components/ReplyBox/ReplyBox';
import styles from './PostView.module.css';

export default function PostView() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:9000/posts/${postId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load post');
        return res.json();
      })
      .then((data) => {
        setPost(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setIsLoading(false);
      });
  }, [postId]);

  if (isLoading) return <p>Loading post...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (!post) return <p>Post not found.</p>;

  const handleSubmit = async () => {

    if (replyText.trim() === '') return;
  
    try {

      const response = await fetch(`http://localhost:9000/posts/${postId}/replies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author: user.username,
          body: replyText,
        }),
      });
  

  
      if (!response.ok) {
        throw new Error('Failed to submit reply');
      }
  
      const newReply = await response.json();

  
      setPost((prev) => ({
        ...prev,
        replies: [...prev.replies, newReply],
      }));
  
      setReplyText('');
      setShowReplyBox(false);
    } catch (err) {
      console.error('Error submitting reply:', err);
      setError('Failed to submit reply.');
    }
  };

  return (
    <div className={styles.postContainer}>
      <div className={styles.post}>
        <h2 className={styles.title}>{post.title}</h2>
        <NavLink to={`/profile/${post.author}`}>
          <h5 className={styles.author}>{post.author}</h5>
        </NavLink>
        <p className={styles.body}>{post.body}</p>

        <button
          className={styles.replyButton}
          onClick={() => {
            if (!user) {
              navigate('/login', { state: { from: `/posts/${postId}` } });
              return;
            }
            setShowReplyBox(!showReplyBox);
          }}
        >
          {showReplyBox ? 'Cancel' : 'Reply'}
        </button>

        {showReplyBox && (
          <div className={styles.replyContainer}>
            <ReplyBox
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <button className={styles.submitButton} onClick={handleSubmit}>
              Submit Reply
            </button>
          </div>
        )}
      </div>

      <div className={styles.replyContainer}>
        {post.replies.length === 0 ? (
          <p>No replies found.</p>
        ) : (
          post.replies.map((reply) => (
            <div key={reply.replyId} className={styles.reply}>
              <h3 className={styles.replyAuthor}>{reply.author}</h3>
              <p className={styles.replyBody}>{reply.body}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
