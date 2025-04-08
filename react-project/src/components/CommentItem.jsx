// CommentItem.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

const CommentItem = ({ comment, onDelete, onLikeToggle }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(comment.likes || 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border p-3 rounded relative bg-gray-50 shadow-sm"
    >
      <div className="font-semibold text-sm md:text-base">{comment.user}</div>
      <div className="text-sm text-gray-700">{comment.text}</div>

      <div className="flex items-center justify-between mt-2 text-sm">
        <motion.button
          whileTap={{ scale: 1.2 }}
          onClick={() =>
            onLikeToggle(comment.id, liked, setLiked, setLikes)
          }
          className={`text-red-400 hover:text-red-600 transition ${
            liked ? "font-bold" : ""
          }`}
        >
          ❤️ {likes}
        </motion.button>

        {comment.is_owner && (
          <button
            onClick={onDelete}
            className="text-gray-400 hover:text-red-500"
          >
            🗑 Видалити
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default CommentItem;
