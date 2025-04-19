import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import styles from './Edit.module.css';

const classes = ['Warrior', 'Mage', 'Rogue', 'Cleric', 'Ranger'];
const roles = ['Tank', 'DPS', 'Healer', 'Support'];

export default function Edit() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('characters')
        .update({
          name: character.name,
          class: character.class,
          role: character.role,
          level: character.level,
          description: character.description,
          image_url: character.image_url
        })
        .eq('id', id);

      if (error) throw error;
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleDelete() {
    const confirmDelete = window.confirm('Are you sure you want to delete this character?');
    if (!confirmDelete) return;
    
    try {
      const { error } = await supabase
        .from('characters')
        .delete()
        .eq('id', id);

      if (error) throw error;
      navigate('/');
    } catch (error) {
      alert(error.message);
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
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Edit Character</h1>
        <form onSubmit={handleSubmit} className={styles.characterForm}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Name</label>
            <input
              type="text"
              className={styles.formInput}
              value={character.name}
              onChange={(e) => setCharacter({...character, name: e.target.value})}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Class</label>
            <div className={styles.attributeOptions}>
              {classes.map((cls) => (
                <button
                  key={cls}
                  type="button"
                  className={`${styles.attributeBtn} ${character.class === cls ? styles.selected : ''}`}
                  onClick={() => setCharacter({...character, class: cls})}
                >
                  {cls}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Role</label>
            <div className={styles.attributeOptions}>
              {roles.map((r) => (
                <button
                  key={r}
                  type="button"
                  className={`${styles.attributeBtn} ${character.role === r ? styles.selected : ''}`}
                  onClick={() => setCharacter({...character, role: r})}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Level</label>
            <input
              type="number"
              min="1"
              max="100"
              className={styles.formInput}
              value={character.level}
              onChange={(e) => setCharacter({...character, level: e.target.value})}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Description</label>
            <textarea
              className={`${styles.formInput} ${styles.formTextarea}`}
              value={character.description}
              onChange={(e) => setCharacter({...character, description: e.target.value})}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Image URL</label>
            <input
              type="url"
              className={styles.formInput}
              value={character.image_url || ''}
              onChange={(e) => setCharacter({...character, image_url: e.target.value})}
            />
          </div>

          <div className={styles.formActions}>
            <button type="submit" className={styles.saveButton}>
              Save Changes
            </button>
            <button
              type="button"
              className={styles.deleteButton}
              onClick={handleDelete}
            >
              Delete Character
            </button>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}