import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';  // One level up from pages
import { formatDistanceToNow } from 'date-fns';

function PostPage({ fetchPosts }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    title: '',
    content: '',
    image_url: ''
  });

  useEffect(() => {
    fetchPostAndComments();
  }, [id]);

  const fetchPostAndComments = async () => {
    setLoading(true);
    try {
      // Fetch post
      const { data: postData, error: postError } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

      if (postError) throw postError;

      // Fetch comments
      const { data: commentsData, error: commentsError } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', id)
        .order('created_at', { ascending: false });

      if (commentsError) throw commentsError;

      setPost(postData);
      setComments(commentsData);
      setEditData({
        title: postData.title,
        content: postData.content || '',
        image_url: postData.image_url || ''
      });
    } catch (error) {
      console.error('Error fetching post:', error.message);
      setError('Failed to load post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpvote = async () => {
    try {
      const { error } = await supabase
        .from('posts')
        .update({ upvotes: post.upvotes + 1 })
        .eq('id', id);
  
      if (error) throw error;
      console.log('Current upvotes:', post.upvotes);
  
      // Update local state immediately for better UX
      setPost({ ...post, upvotes: post.upvotes + 1 });

      console.log('After update, should be:', post.upvotes + 1);
      
      // Force refresh the posts list in HomePage
      await fetchPosts();  // This should be passed from App.jsx
    } catch (error) {
      console.error('Error upvoting post:', error.message);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
  
    try {
      console.log('Attempting to add comment to post:', id);
      const { data, error } = await supabase
        .from('comments')
        .insert([
          { 
            post_id: id, 
            text: newComment,
            created_at: new Date().toISOString() 
          }
        ])
        .select();
  
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
  
      console.log('Comment added successfully:', data);
      setNewComment('');
      await fetchPostAndComments();
    } catch (error) {
      console.error('Error in handleCommentSubmit:', error);
      setError(`Failed to add comment: ${error.message}`);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!editData.title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      const { error } = await supabase
        .from('posts')
        .update({
          title: editData.title,
          content: editData.content,
          image_url: editData.image_url
        })
        .eq('id', id);

      if (error) throw error;

      setEditMode(false);
      await fetchPostAndComments();
      await fetchPosts();
    } catch (error) {
      console.error('Error updating post:', error.message);
      setError('Failed to update post. Please try again.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const { error } = await supabase
          .from('posts')
          .delete()
          .eq('id', id);

        if (error) throw error;

        navigate('/');
        await fetchPosts();
      } catch (error) {
        console.error('Error deleting post:', error.message);
        setError('Failed to delete post. Please try again.');
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading post...</div>;
  }

  if (!post) {
    return <div className="error">Post not found</div>;
  }

  return (
    <div className="post-page">
      {editMode ? (
        <div className="edit-form">
          <h2>Edit Post</h2>
          {error && <div className="error">{error}</div>}
          <form onSubmit={handleEditSubmit}>
            <div className="form-group">
              <label htmlFor="edit-title">Title*</label>
              <input
                id="edit-title"
                type="text"
                value={editData.title}
                onChange={(e) => setEditData({...editData, title: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="edit-content">Content</label>
              <textarea
                id="edit-content"
                value={editData.content}
                onChange={(e) => setEditData({...editData, content: e.target.value})}
                rows="5"
              />
            </div>
            <div className="form-group">
              <label htmlFor="edit-image">Image URL</label>
              <input
                id="edit-image"
                type="url"
                value={editData.image_url}
                onChange={(e) => setEditData({...editData, image_url: e.target.value})}
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="save-btn">Save Changes</button>
              <button 
                type="button" 
                className="cancel-btn"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          <div className="post-content">
            <div className="post-header">
              <h2>{post.title}</h2>
              <div className="post-meta">
                <span className="timestamp">
                  {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                </span>
                <span className="upvotes">▲ {post.upvotes}</span>
              </div>
            </div>
            
            {post.image_url && (
              <div className="post-image">
                <img src={post.image_url} alt={post.title} />
              </div>
            )}
            
            {post.content && (
              <div className="post-text">
                <p>{post.content}</p>
              </div>
            )}
            
            <div className="post-actions">
              <button onClick={handleUpvote} className="upvote-btn">
                Upvote (▲ {post.upvotes})
              </button>
              <button onClick={() => setEditMode(true)} className="edit-btn">
                Edit Post
              </button>
              <button onClick={handleDelete} className="delete-btn">
                Delete Post
              </button>
            </div>
          </div>
          
          <div className="comments-section">
            <h3>Comments ({comments.length})</h3>
            
            <form onSubmit={handleCommentSubmit} className="comment-form">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                rows="3"
                required
              />
              <button type="submit" className="submit-comment">
                Post Comment
              </button>
            </form>
            
            {comments.length === 0 ? (
              <p className="no-comments">No comments yet. Be the first to comment!</p>
            ) : (
              <div className="comments-list">
                {comments.map((comment) => (
                  <div key={comment.id} className="comment">
                    <div className="comment-text">{comment.text}</div>
                    <div className="comment-meta">
                      {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default PostPage;