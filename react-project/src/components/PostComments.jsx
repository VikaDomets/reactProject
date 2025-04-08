// PostComments.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentItem from "./CommentItem";

const PostComments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [postLikes, setPostLikes] = useState(0);
  const [hasLikedPost, setHasLikedPost] = useState(false);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetchPostLikes();
    fetchComments();
  }, []);

  const fetchPostLikes = async () => {
    const res = await axios.get(`/api/likes/numb/${postId}`);
    setPostLikes(res.data.likes);
  };

  const togglePostLike = async () => {
    if (hasLikedPost) {
      await axios.delete(`/api/likes/change/${postId}`);
      setPostLikes(prev => prev - 1);
    } else {
      await axios.post(`/api/likes/change/${postId}`);
      setPostLikes(prev => prev + 1);
    }
    setHasLikedPost(!hasLikedPost);
  };

  const fetchComments = async () => {
    const res = await axios.get(`/api/comments/${postId}`);
    setComments(res.data);
  };

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;
    await axios.post(`/api/comments/${postId}`, { text: newComment });
    setNewComment("");
    fetchComments();
  };

  const handleDeleteComment = async (commentId) => {
    await axios.delete(`/api/comments/one/${commentId}`);
    fetchComments();
  };

  const toggleCommentLike = async (commentId, liked, setLiked, setLikes) => {
    if (liked) {
      await axios.delete(`/api/comment-likes/change/${commentId}`);
      setLikes(prev => prev - 1);
    } else {
      await axios.post(`/api/comment-likes/change/${commentId}`);
      setLikes(prev => prev + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white shadow rounded">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className="text-xl font-semibold">Коментарі</h2>
        <button
          onClick={togglePostLike}
          className="text-red-500 hover:text-red-600 transition"
        >
          ❤️ {postLikes}
        </button>
      </div>

      <div className="space-y-3">
      {Array.isArray(comments) && comments.map(comment => (

          <CommentItem
            key={comment.id}
            comment={comment}
            onDelete={() => handleDeleteComment(comment.id)}
            onLikeToggle={toggleCommentLike}
          />
        ))}
      </div>

      <div className="mt-4">
        <textarea
          className="w-full p-2 border rounded mb-2 text-sm resize-none"
          rows="3"
          placeholder="Напишіть коментар..."
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
        />
        <button
          onClick={handleAddComment}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition text-sm"
        >
          Надіслати
        </button>
      </div>
    </div>
  );
};

export default PostComments;
