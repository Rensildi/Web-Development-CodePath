import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={`${styles.container} container`}>
        <Link to="/" className={styles.brand}>Game Team Builder</Link>
        <div className={styles.links}>
          <Link to="/" className={styles.link}>Team</Link>
          <Link to="/create" className={styles.link}>Create New</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;