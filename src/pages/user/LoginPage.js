import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from '../../assets/styles/LoginPage.module.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
      event.preventDefault();
      const data = await login(email, password);
      if (data) {
        navigate('/'); 
      } else {
        alert("Login failed");
      }
  };

  const handleSocialLogin = (social) => {
    window.location.href = `https://www.voicefinder.kr/oauth2/authorization/${social}`;
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h2>Login</h2>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className={styles.loginButton}>Log In</button>
        <button type="button" className={styles.socialLogin} onClick={() => handleSocialLogin('google')}>Login with Google</button>
        <button type="button" className={styles.socialLogin} onClick={() => handleSocialLogin('kakao')}>Login with Kakao</button>
        <button type="button" className={styles.socialLogin} onClick={() => handleSocialLogin('naver')}>Login with Naver</button>
        <p className={styles.registerLink}>
          Don't have an account? <a href="/register">Sign up</a>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
