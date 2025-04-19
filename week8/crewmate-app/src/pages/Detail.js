import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import styles from './Detail.module.css';

export default function Detail() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCharacter();
  }, [id]);

  async function fetchCharacter() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('characters')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setCharacter(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
    </div>
  );

  if (!character) return <div className={`${styles.container} container`}>Character not found</div>;

  return (
    <div className={`${styles.container} container`}>
      <div className={styles.characterDetail}>
        <div className={styles.detailImageContainer}>
          {character.image_url ? (
            <img
              src={character.image_url}
              alt={character.name}
              className={styles.detailImage}
            />
          ) : (
            <div className={styles.detailImagePlaceholder}>
              <span>No Image</span>
            </div>
          )}
        </div>
        
        <div className={styles.detailContent}>
          <h1 className={styles.detailTitle}>{character.name}</h1>
          
          <div className={styles.detailMeta}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Class:</span>
              <span className={styles.metaValue}>{character.class}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Role:</span>
              <span className={styles.metaValue}>{character.role}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Level:</span>
              <span className={styles.metaValue}>{character.level}</span>
            </div>
          </div>
          
          <div className={styles.detailSection}>
            <h3>Description</h3>
            <p>{character.description || 'No description provided.'}</p>
          </div>
          
          <div className={styles.detailActions}>
            <Link to={`/edit/${character.id}`} className={styles.editButton}>
              Edit Character
            </Link>
            <Link to="/" className={styles.backButton}>
              Back to Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}