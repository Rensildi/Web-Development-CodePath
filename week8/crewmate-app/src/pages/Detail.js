import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

export function Detail() {
  const { id } = useParams()
  const [character, setCharacter] = useState(null)
  const [loading, setLoading] = useState(true)

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

  if (loading) return <div>Loading...</div>
  if (!character) return <div>Character not found</div>

  return (
    <div>
      <h1>{character.name}</h1>
      {character.image_url && (
        <img src={character.image_url} alt={character.name} style={{ maxWidth: '200px' }} />
      )}
      <p>Class: {character.class}</p>
      <p>Role: {character.role}</p>
      <p>Level: {character.level}</p>
      <p>Description: {character.description}</p>
      <Link to={`/edit/${character.id}`}>Edit Character</Link>
      <Link to="/">Back to Team</Link>
    </div>
  )
}

export default Detail