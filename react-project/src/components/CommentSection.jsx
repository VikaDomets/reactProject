// import { useState, useEffect } from 'react';
// import styles from '../styles/commentSection.module.css';

// const CommentSection = ({ exhibitionId }) => {
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState('');

//   // Завантаження коментарів з localStorage
//   useEffect(() => {
//     const savedComments = JSON.parse(localStorage.getItem(`comments_${exhibitionId}`)) || [];
//     setComments(savedComments);
//   }, [exhibitionId]);

//   const addComment = () => {
//     if (!newComment.trim()) return;
//     const comment = {
//       id: Date.now(),
//       text: newComment,
//       date: new Date().toISOString(),
//       author: 'Анонім' // Пізніше додати авторизацію
//     };
//     const updatedComments = [...comments, comment];
//     setComments(updatedComments);
//     localStorage.setItem(`comments_${exhibitionId}`, JSON.stringify(updatedComments));
//     setNewComment('');
//   };

//   return (
//     <div className={styles.commentSection}>
//       <h3>Коментарі ({comments.length})</h3>
//       <ul className={styles.commentList}>
//         {comments.map(comment => (
//           <li key={comment.id} className={styles.comment}>
//             <p className={styles.commentText}>{comment.text}</p>
//             <div className={styles.commentMeta}>
//               <span className={styles.author}>{comment.author}</span>
//               <span className={styles.date}>
//                 {new Date(comment.date).toLocaleDateString()}
//               </span>
//             </div>
//           </li>
//         ))}
//       </ul>
//       <textarea
//         value={newComment}
//         onChange={(e) => setNewComment(e.target.value)}
//         placeholder="Напишіть коментар..."
//         className={styles.commentInput}
//       />
//       <button onClick={addComment} className={styles.commentSubmit}>
//         Надіслати
//       </button>
//     </div>
//   );
// };

// export default CommentSection;

import { useState, useEffect } from 'react';
import styles from '../styles/commentSection.module.css';

const CommentSection = ({ exhibitionId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // Завантаження коментарів з localStorage
  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem(`comments_${exhibitionId}`)) || [];
    setComments(savedComments);
  }, [exhibitionId]);

  const addComment = () => {
    if (!newComment.trim()) return;
    const comment = {
      id: Date.now(),
      text: newComment,
      date: new Date().toISOString(),
      author: 'Анонім' // Пізніше додати авторизацію
    };
    const updatedComments = [...comments, comment];
    setComments(updatedComments);
    localStorage.setItem(`comments_${exhibitionId}`, JSON.stringify(updatedComments));
    setNewComment('');
  };

  return (
    <div className={styles.commentSection}>
      <h3>Коментарі ({comments.length})</h3>
      <ul className={styles.commentList}>
        {comments.map(comment => (
          <li key={comment.id} className={styles.comment}>
            <p className={styles.commentText}>{comment.text}</p>
            <div className={styles.commentMeta}>
              <span className={styles.author}>{comment.author}</span>
              <span className={styles.date}>
                {new Date(comment.date).toLocaleDateString()}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Напишіть коментар..."
        className={styles.commentInput}
      />
      <button onClick={addComment} className={styles.commentSubmit}>
        Надіслати
      </button>
    </div>
  );
};

export default CommentSection;