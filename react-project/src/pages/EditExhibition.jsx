import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ExhibitionsContext } from '../context/ExhibitionsContext';
import styles from '../styles/exhibitionSingle.module.css';

const EditExhibition = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    fetchSingleExhibition, 
    updateExhibition, 
    deleteExhibition 
  } = useContext(ExhibitionsContext);
  
  const [exhibition, setExhibition] = useState({
    title: '',
    date: '',
    description: '',
    image: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadExhibition = async () => {
      try {
        const data = await fetchSingleExhibition(id);
        setExhibition(data);
      } catch (error) {
        console.error("Помилка завантаження:", error);
      } finally {
        setLoading(false);
      }
    };
    loadExhibition();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExhibition(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setExhibition(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateExhibition(id, exhibition);
      navigate(`/exhibition/${id}`);
    } catch (error) {
      console.error("Помилка оновлення:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteExhibition(id);
      navigate('/exhibitions');
    } catch (error) {
      console.error("Помилка видалення:", error);
    }
  };

  if (loading) return <div className={styles.loading}>Завантаження...</div>;

  return (
    <section className={styles.exhibitionSingle}>
      <form onSubmit={handleSubmit} className={styles.editForm}>
        <div className={styles.header}>
          <input
            type="text"
            name="title"
            value={exhibition.title}
            onChange={handleChange}
            className={styles.editInput}
          />
        </div>

        <div className={styles.content}>
          <div className={styles.imageUpload}>
            <input 
              type="file" 
              onChange={handleImageChange} 
              accept="image/*"
            />
            {exhibition.image && (
              <img 
                src={
                  exhibition.image instanceof File ? 
                  URL.createObjectURL(exhibition.image) : 
                  exhibition.image
                } 
                alt={exhibition.title} 
                className={styles.image}
              />
            )}
          </div>
          
          <div className={styles.details}>
            <input
              type="text"
              name="date"
              value={exhibition.date}
              onChange={handleChange}
              className={styles.editInput}
              placeholder="Дата виставки"
            />
            
            <textarea
              name="description"
              value={exhibition.description}
              onChange={handleChange}
              className={styles.editTextarea}
            />
            
            <div className={styles.editButtons}>
              <button 
                type="button" 
                onClick={handleDelete}
                className={styles.deleteButton}
              >
                Видалити
              </button>
              <button 
                type="submit"
                className={styles.saveButton}
              >
                Зберегти
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

// export default EditExhibition;