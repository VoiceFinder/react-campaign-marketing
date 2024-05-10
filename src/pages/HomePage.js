import React from 'react';
import styles from '../assets/styles/HomePage.module.css';

function HomePage() {
  return (
    <div className={styles.homeContainer}>
      <h2 className={styles.homeTitle}>Welcome to My Campaign App</h2>
      <p className={styles.homeText}>
        This is your one-stop solution for campaign management and review tracking. Discover the power of data-driven decisions.
      </p>
    </div>
  );
}

export default HomePage;
