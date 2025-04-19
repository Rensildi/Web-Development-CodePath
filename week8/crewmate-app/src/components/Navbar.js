import { Link } from 'react-router-dom'

export function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">Game Team Builder</Link>
          <div className="navbar-links">
            <Link to="/" className="nav-link">Team</Link>
            <Link to="/create" className="nav-link">Create New</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar