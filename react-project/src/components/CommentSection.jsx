
// import { useState, useEffect } from 'react';
// import styles from '../styles/commentSection.module.css';
// import axios from 'axios';

// // Тимчасовий мок API для тестування, поки не підключений бекенд
// const API = {
//   baseUrl: 'https://your-api-domain.com/api' || 'http://localhost:3001/api',
//   endpoints: {
//     getComments: (exhibitionId) => `/exhibitions/${exhibitionId}/comments`,
//     addComment: (exhibitionId) => `/exhibitions/${exhibitionId}/comments`,
//   }
// };

// // Функція для мокування API, якщо бекенд не доступний
// const mockApi = {
//   getComments: async (exhibitionId) => {
//     // Спробуємо отримати з localStorage
//     const saved = localStorage.getItem(`comments_${exhibitionId}`);
//     return saved ? JSON.parse(saved) : [];
//   },
//   addComment: async (exhibitionId, comment) => {
//     const comments = await mockApi.getComments(exhibitionId);
//     const newComment = {
//       ...comment,
//       id: Date.now(),
//       createdAt: new Date().toISOString()
//     };
//     const updated = [...comments, newComment];
//     localStorage.setItem(`comments_${exhibitionId}`, JSON.stringify(updated));
//     return newComment;
//   }
// };

// const CommentSection = ({ exhibitionId }) => {
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [apiAvailable, setApiAvailable] = useState(true);

//   // Перевірка доступності бекенду
//   useEffect(() => {
//     const checkApi = async () => {
//       try {
//         await axios.get(`${API.baseUrl}/health`);
//         setApiAvailable(true);
//       } catch {
//         setApiAvailable(false);
//         console.warn('Бекенд не доступен, використовується локальне сховище');
//       }
//     };
//     checkApi();
//   }, []);

//   // Отримання коментарів
//   useEffect(() => {
//     if (!exhibitionId) return;

//     const fetchComments = async () => {
//       try {
//         setLoading(true);
//         let data;
        
//         if (apiAvailable) {
//           const response = await axios.get(
//             `${API.baseUrl}${API.endpoints.getComments(exhibitionId)}`
//           );
//           data = response.data;
//         } else {
//           data = await mockApi.getComments(exhibitionId);
//         }
        
//         setComments(data);
//       } catch (err) {
//         setError('Не вдалося завантажити коментарі');
//         console.error('Помилка:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchComments();
//   }, [exhibitionId, apiAvailable]);

//   // Додавання коментаря
//   const handleAddComment = async () => {
//     if (!newComment.trim()) return;

//     const commentData = {
//       text: newComment,
//       authorName: 'Анонім'
//     };

//     try {
//       setLoading(true);
//       let result;
      
//       if (apiAvailable) {
//         const response = await axios.post(
//           `${API.baseUrl}${API.endpoints.addComment(exhibitionId)}`,
//           commentData
//         );
//         result = response.data;
//       } else {
//         result = await mockApi.addComment(exhibitionId, commentData);
//       }
      
//       setComments(prev => [...prev, result]);
//       setNewComment('');
//     } catch (err) {
//       setError('Не вдалося додати коментар');
//       console.error('Помилка:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={styles.commentSection}>
//       <h3>Коментарі ({comments.length})</h3>
      
//       {!apiAvailable && (
//         <div className={styles.warning}>Режим офлайн: коментарі зберігаються локально</div>
//       )}
      
//       {error && <div className={styles.error}>{error}</div>}
      
//       <ul className={styles.commentList}>
//         {comments.map(comment => (
//           <li key={comment.id || comment._id} className={styles.comment}>
//             <p className={styles.commentText}>{comment.text}</p>
//             <div className={styles.commentMeta}>
//               <span className={styles.author}>
//                 {comment.author?.name || comment.authorName || 'Анонім'}
//               </span>
//               <span className={styles.date}>
//                 {new Date(comment.createdAt || comment.date).toLocaleString()}
//               </span>
//             </div>
//           </li>
//         ))}
//       </ul>
      
//       <div className={styles.commentForm}>
//         <textarea
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//           placeholder="Залиште ваш коментар..."
//           className={styles.commentInput}
//           disabled={loading}
//         />
//         <button
//           onClick={handleAddComment}
//           className={styles.commentSubmit}
//           disabled={loading || !newComment.trim()}
//         >
//           {loading ? 'Надсилання...' : 'Відправити'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CommentSection;

import { useState, useEffect } from 'react';
import styles from '../styles/commentSection.module.css';
import axios from 'axios';

const API = {
  baseUrl: 'https://your-api-domain.com/api' || 'http://localhost:3001/api',
  endpoints: {
    getComments: (exhibitionId) => `/exhibitions/${exhibitionId}/comments`,
    addComment: (exhibitionId) => `/exhibitions/${exhibitionId}/comments`,
    deleteComment: (commentId) => `/comments/${commentId}`
  }
};

const mockApi = {
  getComments: async (exhibitionId) => {
    const saved = localStorage.getItem(`comments_${exhibitionId}`);
    return saved ? JSON.parse(saved) : [];
  },
  addComment: async (exhibitionId, comment) => {
    const comments = await mockApi.getComments(exhibitionId);
    const newComment = {
      ...comment,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    const updated = [...comments, newComment];
    localStorage.setItem(`comments_${exhibitionId}`, JSON.stringify(updated));
    return newComment;
  },
  deleteComment: async (exhibitionId, commentId) => {
    const comments = await mockApi.getComments(exhibitionId);
    const updated = comments.filter(comment => comment.id !== commentId);
    localStorage.setItem(`comments_${exhibitionId}`, JSON.stringify(updated));
    return commentId;
  }
};

const CommentSection = ({ exhibitionId, isEditing }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiAvailable, setApiAvailable] = useState(true);

  useEffect(() => {
    const checkApi = async () => {
      try {
        await axios.get(`${API.baseUrl}/health`);
        setApiAvailable(true);
      } catch {
        setApiAvailable(false);
        console.warn('Сервер не відповідає, дані зберігаються локально');
      }
    };
    checkApi();
  }, []);

  useEffect(() => {
    if (!exhibitionId) return;

    const fetchComments = async () => {
      try {
        setLoading(true);
        let data;
        
        if (apiAvailable) {
          const response = await axios.get(
            `${API.baseUrl}${API.endpoints.getComments(exhibitionId)}`
          );
          data = response.data;
        } else {
          data = await mockApi.getComments(exhibitionId);
        }
        
        setComments(data);
      } catch (err) {
        setError('Не вдалося завантажити коментарі');
        console.error('Помилка:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [exhibitionId, apiAvailable]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    const commentData = {
      text: newComment,
      authorName: 'Анонімний користувач'
    };

    try {
      setLoading(true);
      let result;
      
      if (apiAvailable) {
        const response = await axios.post(
          `${API.baseUrl}${API.endpoints.addComment(exhibitionId)}`,
          commentData
        );
        result = response.data;
      } else {
        result = await mockApi.addComment(exhibitionId, commentData);
      }
      
      setComments(prev => [...prev, result]);
      setNewComment('');
    } catch (err) {
      setError('Не вдалося додати коментар');
      console.error('Помилка:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      setLoading(true);
      
      if (apiAvailable) {
        await axios.delete(`${API.baseUrl}${API.endpoints.deleteComment(commentId)}`);
      } else {
        await mockApi.deleteComment(exhibitionId, commentId);
      }
      
      setComments(prev => prev.filter(comment => comment.id !== commentId));
    } catch (err) {
      setError('Не вдалося видалити коментар');
      console.error('Помилка:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.commentSection}>
      <h3>Коментарі ({comments.length})</h3>
      
      {!apiAvailable && (
        <div className={styles.warning}>Сервер не відповідає, дані зберігаються локально</div>
      )}
      
      {error && <div className={styles.error}>{error}</div>}
      
      <ul className={styles.commentList}>
        {comments.map(comment => (
          <li key={comment.id || comment._id} className={styles.comment}>
            <p className={styles.commentText}>{comment.text}</p>
            <div className={styles.commentMeta}>
              <span className={styles.author}>
                {comment.author?.name || comment.authorName || 'Анонімний користувач'}
              </span>
              <span className={styles.date}>
                {new Date(comment.createdAt || comment.date).toLocaleString('uk-UA')}
              </span>
              {isEditing && (
                <button
                  onClick={() => handleDeleteComment(comment.id || comment._id)}
                  className={styles.deleteButton}
                  disabled={loading}
                >
                  Видалити
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
      
      <div className={styles.commentForm}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Залиште ваш коментар..."
          className={styles.commentInput}
          disabled={loading}
        />
        <button
          onClick={handleAddComment}
          className={styles.commentSubmit}
          disabled={loading || !newComment.trim()}
        >
          {loading ? 'Надсилання...' : 'Відправити'}
        </button>
      </div>
    </div>
  );
};

export default CommentSection;