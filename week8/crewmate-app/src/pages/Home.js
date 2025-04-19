import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

export function Home() {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCharacters()
  }, [])

  async function fetchCharacters() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('characters')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setCharacters(data)
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
    </div>
  )

  return (
    <div className="container">
      <h1 className="page-title">Your Team</h1>
      {characters.length === 0 ? (
        <div className="empty-state">
          <p>No characters yet. Create your first one!</p>
          <Link to="/create" className="btn btn-primary">Create Character</Link>
        </div>
      ) : (
        <div className="character-grid">
          {characters.map((character) => (
            <div key={character.id} className="character-card">
              {character.image_url && (
                <img 
                  src={character.image_url} 
                  alt={character.name} 
                  className="character-image"
                />
              )}
              <div className="character-content">
                <h2 className="character-name">{character.name}</h2>
                <div className="character-meta">
                  <span className="character-class">{character.class}</span>
                  <span className="character-level">Level {character.level}</span>
                </div>
                <p className="character-role">{character.role}</p>
                <div className="character-actions">
                  <Link to={`/character/${character.id}`} className="btn btn-outline">
                    Details
                  </Link>
                  <Link to={`/edit/${character.id}`} className="btn btn-primary">
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
export default Home