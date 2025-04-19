import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import styles from './Home.module.css';

export default function Home() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCharacters();
  }, []);

  async function fetchCharacters() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('characters')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCharacters(data);
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

  return (
    <div className={`${styles.container} container`}>
      <h1 className={styles.title}>Your Team</h1>
      {characters.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No characters yet. Create your first one!</p>
          <Link to="/create" className={styles.createButton}>Create Character</Link>
        </div>
      ) : (
        <div className={styles.characterGrid}>
          {characters.map((character) => (
            <div key={character.id} className={styles.characterCard}>
              {character.image_url && (
                <img 
                  src={character.image_url} 
                  alt={character.name} 
                  className={styles.characterImage}
                />
              )}
              <div className={styles.characterContent}>
                <h2 className={styles.characterName}>{character.name}</h2>
                <div className={styles.characterMeta}>
                  <span className={styles.characterClass}>{character.class}</span>
                  <span className={styles.characterLevel}>Level {character.level}</span>
                </div>
                <p className={styles.characterRole}>{character.role}</p>
                <div className={styles.characterActions}>
                  <Link to={`/character/${character.id}`} className={styles.detailButton}>
                    Details
                  </Link>
                  <Link to={`/edit/${character.id}`} className={styles.editButton}>
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}