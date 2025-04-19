import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

const classes = ['Warrior', 'Mage', 'Rogue', 'Cleric', 'Ranger']
const roles = ['Tank', 'DPS', 'Healer', 'Support']

export function Create() {
  const [name, setName] = useState('')
  const [characterClass, setCharacterClass] = useState('')
  const [role, setRole] = useState('')
  const [level, setLevel] = useState(1)
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      const { data, error } = await supabase
        .from('characters')
        .insert([{ 
          name, 
          class: characterClass, 
          role, 
          level, 
          description,
          image_url: imageUrl,
          user_id: user.id
        }])
        .single()

      if (error) throw error
      navigate('/')
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className="container">
      <div className="form-container">
        <h1 className="page-title">Create New Character</h1>
        <form onSubmit={handleSubmit} className="character-form">
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
                  className={`attribute-btn ${characterClass === cls ? 'selected' : ''}`}
                  onClick={() => setCharacterClass(cls)}
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
                  className={`attribute-btn ${role === r ? 'selected' : ''}`}
                  onClick={() => setRole(r)}
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
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-input form-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Image URL (optional)</label>
            <input
              type="url"
              className="form-input"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Create Character
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

export default Create