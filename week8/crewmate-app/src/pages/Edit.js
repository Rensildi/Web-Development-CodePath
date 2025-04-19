import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

const classes = ['Warrior', 'Mage', 'Rogue', 'Cleric', 'Ranger']
const roles = ['Tank', 'DPS', 'Healer', 'Support']

export function Edit() {
  const { id } = useParams()
  const [character, setCharacter] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchCharacter()
  }, [id])

  async function fetchCharacter() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('characters')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      setCharacter(data)
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    
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
        .eq('id', id)

      if (error) throw error
      navigate('/')
    } catch (error) {
      alert(error.message)
    }
  }

  async function handleDelete() {
    const confirmDelete = window.confirm('Are you sure you want to delete this character?')
    if (!confirmDelete) return
    
    try {
      const { error } = await supabase
        .from('characters')
        .delete()
        .eq('id', id)

      if (error) throw error
      navigate('/')
    } catch (error) {
      alert(error.message)
    }
  }

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
    </div>
  )

  if (!character) return <div className="container">Character not found</div>

  return (
    <div className="container">
      <div className="form-container">
        <h1 className="page-title">Edit Character</h1>
        <form onSubmit={handleSubmit} className="character-form">
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-input"
              value={character.name}
              onChange={(e) => setCharacter({...character, name: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Class</label>
            <div className="attribute-options">
              {classes.map((cls) => (
                <button
                  key={cls}
                  type="button"
                  className={`attribute-btn ${character.class === cls ? 'selected' : ''}`}
                  onClick={() => setCharacter({...character, class: cls})}
                >
                  {cls}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Role</label>
            <div className="attribute-options">
              {roles.map((r) => (
                <button
                  key={r}
                  type="button"
                  className={`attribute-btn ${character.role === r ? 'selected' : ''}`}
                  onClick={() => setCharacter({...character, role: r})}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Level</label>
            <input
              type="number"
              min="1"
              max="100"
              className="form-input"
              value={character.level}
              onChange={(e) => setCharacter({...character, level: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-input form-textarea"
              value={character.description}
              onChange={(e) => setCharacter({...character, description: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Image URL</label>
            <input
              type="url"
              className="form-input"
              value={character.image_url || ''}
              onChange={(e) => setCharacter({...character, image_url: e.target.value})}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              Delete Character
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Edit