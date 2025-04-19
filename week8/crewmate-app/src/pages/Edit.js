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

  if (loading) return <div>Loading...</div>
  if (!character) return <div>Character not found</div>

  return (
    <div>
      <h1>Edit Character</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input 
            type="text" 
            value={character.name} 
            onChange={(e) => setCharacter({...character, name: e.target.value})} 
            required 
          />
        </label>

        <label>
          Class:
          <div>
            {classes.map((cls) => (
              <button 
                key={cls} 
                type="button"
                className={character.class === cls ? 'selected' : ''}
                onClick={() => setCharacter({...character, class: cls})}
              >
                {cls}
              </button>
            ))}
          </div>
        </label>

        <label>
          Role:
          <div>
            {roles.map((r) => (
              <button 
                key={r} 
                type="button"
                className={character.role === r ? 'selected' : ''}
                onClick={() => setCharacter({...character, role: r})}
              >
                {r}
              </button>
            ))}
          </div>
        </label>

        <label>
          Level:
          <input 
            type="number" 
            min="1" 
            max="100" 
            value={character.level} 
            onChange={(e) => setCharacter({...character, level: e.target.value})} 
          />
        </label>

        <label>
          Description:
          <textarea 
            value={character.description} 
            onChange={(e) => setCharacter({...character, description: e.target.value})} 
          />
        </label>

        <label>
          Image URL:
          <input 
            type="url" 
            value={character.image_url || ''} 
            onChange={(e) => setCharacter({...character, image_url: e.target.value})} 
          />
        </label>

        <button type="submit">Update Character</button>
        <button type="button" onClick={handleDelete}>Delete Character</button>
      </form>
    </div>
  )
}

export default Edit