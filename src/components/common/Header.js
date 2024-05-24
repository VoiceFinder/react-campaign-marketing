import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from '../../assets/styles/Header.module.css'; 

function Header() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');  // 로그아웃 후 홈페이지로 리디렉트
  };

  return (
    <header className={styles.header}>
      <h2><Link to="/">Home</Link></h2>
      <nav>
        <ul className={styles.navList}>
          <li className={styles.navItem}><Link to="/markets" className={styles.navLink}>Markets</Link></li>
          {isAuthenticated ? (
            <>
              <li className={styles.navItem}><Link to="/profile" className={styles.navLink}>Profile</Link></li>
              <li className={styles.navItem}>
                <button onClick={handleLogout} className={styles.navButton}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className={styles.navItem}><Link to="/login" className={styles.navLink}>Login</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
