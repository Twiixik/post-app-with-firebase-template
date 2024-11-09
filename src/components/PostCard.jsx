import { useNavigate } from "react-router-dom";
import UserAvatar from "./UserAvatar";

export default function PostCard({ post }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/posts/${post.id}`);
  }

  return (
    <article className="post-card" onClick={handleClick}>
      <div className="post-card-header">
        <UserAvatar uid={post.uid} />
        <div className="user-info">
          <span className="user-name">{post.userName}</span>
          <span className="verified-badge">✔️</span>
        </div>
        <button className="follow-button">Follow</button>
        <div className="more-options">⋮</div>
      </div>
      <div className="post-card-image">
        <img src={post.image} alt={post.caption} />
      </div>
      <div className="post-card-body">
        <p className="post-caption">
          <span className="post-user-handle">@{post.userHandle}</span> {post.caption}
        </p>
        <div className="post-engagement">
          <span className="likes">❤️ {post.likes}</span>
          <span className="comments">💬 {post.comments}</span>
        </div>
        <p className="view-all-comments">View all comments</p>
        <div className="add-comment">
          <img className="comment-avatar" src={post.commentAvatar} alt="Comment avatar" />
          <input type="text" placeholder="Add a comment..." />
        </div>
        <p className="post-timestamp">2 hours ago</p>
      </div>
    </article>
  );
}
  