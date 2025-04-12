import { useState, useContext, useEffect } from 'react';
import { ExhibitionsContext } from '../context/ExhibitionsContext';
import styles from '../styles/likeButton.module.css';
import axios from 'axios';

const LikeButton = ({ exhibitionId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const { loading } = useContext(ExhibitionsContext);

  // ================= ЕНДПОЇНТИ ДЛЯ БЕКЕНДУ =================
  const API_ENDPOINTS = {
    getLikes: `/api/exhibitions/${exhibitionId}/likes`,      // GET - отримати стан лайка
    addLike: `/api/exhibitions/${exhibitionId}/likes`,      // POST - додати лайк
    removeLike: `/api/exhibitions/${exhibitionId}/likes`,   // DELETE - видалити лайк
  };
  // ========================================================

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        // Запит до бекенду (працюватиме, коли бекенд буде готовий)
        const response = await axios.get(API_ENDPOINTS.getLikes);
        setIsLiked(response.data.isLiked);
        setLikeCount(response.data.likeCount);
      } catch (error) {
        console.error("Помилка завантаження лайків:", error);
        // Тимчасово: встановлюємо дефолтні значення
        setIsLiked(false);
        setLikeCount(0);
      }
    };
    fetchLikes();
  }, [exhibitionId]);

  const handleLike = async () => {
    if (loading) return;
    
    try {
      if (isLiked) {
        await axios.delete(API_ENDPOINTS.removeLike);
        setLikeCount(prev => prev - 1);
      } else {
        await axios.post(API_ENDPOINTS.addLike);
        setLikeCount(prev => prev + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Помилка оновлення лайку:", error);
      // Тимчасово: змінюємо стан локально (доки бекенд не готовий)
      setIsLiked(!isLiked);
      setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    }
  };

  return (
    <button 
      onClick={handleLike} 
      className={`${styles.likeButton} ${isLiked ? styles.liked : ''}`}
      disabled={loading}
    >
      {isLiked ? '❤️' : '🤍'} {likeCount}
    </button>
  );
};

export default LikeButton;