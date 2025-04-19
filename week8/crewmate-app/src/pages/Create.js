import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import styles from './Create.module.css';

const classes = ['Warrior', 'Mage', 'Rogue', 'Cleric', 'Ranger'];
const roles = ['Tank', 'DPS', 'Healer', 'Support'];

export default function Create() {
  const [name, setName] = useState('');
  const [characterClass, setCharacterClass] = useState('');
  const [role, setRole] = useState('');
  const [level, setLevel] = useState(1);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      const { data, error } = await supabase
        .from('characters')
        .insert([{ 
          name, 
          class: characterClass, 
          role, 
          level, 
          description,
          image_url: imageUrl
        }])
        .single();

      if (error) throw error;
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className={`${styles.container} container`}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Create New Character</h1>
        <form onSubmit={handleSubmit} className={styles.characterForm}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Name</label>
            <input
              type="text"
              className={styles.formInput}
              value={name}
              onChange={(e) => setName(e.target.value)}
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
                  className={`${styles.attributeBtn} ${characterClass === cls ? styles.selected : ''}`}
                  onClick={() => setCharacterClass(cls)}
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
                  className={`${styles.attributeBtn} ${role === r ? styles.selected : ''}`}
                  onClick={() => setRole(r)}
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
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Description</label>
            <textarea
              className={`${styles.formInput} ${styles.formTextarea}`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Image URL (optional)</label>
            <input
              type="url"
              className={styles.formInput}
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>

          <div className={styles.formActions}>
            <button type="submit" className={styles.submitButton}>
              Create Character
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