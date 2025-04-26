import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

function PostCard({ post }) {
  return (
    <div className="post-card">
      <Link to={`/post/${post.id}`} className="post-link">
        <div className="post-header">
          <h3>{post.title}</h3>
          <span className="upvotes">▲ {post.upvotes}</span>
        </div>
        <div className="post-meta">
          <span className="timestamp">
            {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
          </span>
        </div>
      </Link>
    </div>
  );
}

export default PostCard;