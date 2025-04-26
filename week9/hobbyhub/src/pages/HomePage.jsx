import { useEffect } from 'react';
import PostCard from '../components/PostCard';

function HomePage({ posts, loading, fetchPosts }) {

  useEffect(() => {
    console.log('Posts updated:', posts);
  }, [posts]);

  return (
    <div className="home-page">
      <h1>Welcome to HobbyHub</h1>
      <p>Share your passion with the community!</p>
      
      {loading ? (
        <div className="loading">Loading posts...</div>
      ) : posts.length === 0 ? (
        <div className="no-posts">No posts found. Be the first to create one!</div>
      ) : (
        <div className="posts-feed">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;