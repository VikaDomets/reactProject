import { useState, useContext } from 'react';
import { ExhibitionsContext } from '../context/ExhibitionsContext';
import styles from '../styles/likeButton.module.css';

const LikeButton = ({ exhibitionId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const { loading } = useContext(ExhibitionsContext);

  const handleLike = () => {
    if (loading) return;
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    // Тут буде запит до API, коли з'явиться бекенд
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