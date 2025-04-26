import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';  // One level up from components

function CreatePost({ fetchPosts }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('posts')
        .insert([{ title, content, image_url: imageUrl }])
        .select();

      if (error) throw error;

      await fetchPosts();
      navigate(`/post/${data[0].id}`);
    } catch (error) {
      console.error('Error creating post:', error.message);
      setError('Failed to create post. Please try again.');
    }
  };

  return (
    <div className="create-post-container">
        <h2 className="create-post-title">Create a New Post</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="create-post-form">
        <div className="form-group">
          <label htmlFor="title">Title*</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter post content (optional)"
            rows="5"
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            id="imageUrl"
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL (optional)"
          />
        </div>
        <button type="submit" className="submit-btn">
          Create Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;