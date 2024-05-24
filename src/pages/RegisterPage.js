import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import AuthService from '../services/AuthService';
import styles from '../assets/styles/RegisterPage.module.css'; // 스타일 시트 임포트

function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [gender, setGender] = useState('');
    const [imageFile, setImageFile] = useState(null);

    const navigate = useNavigate(); // 네비게이션 함수

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // FormData 객체를 사용하여 파일과 기타 폼 데이터를 포함시킵니다.
        const formData = new FormData();
        const signupRequestDto = {
          email: email,
          password: password,
          username: username,
          birthDate: new Date(birthDate).toISOString(),
          gender: gender
        };
        formData.append('userData', new Blob([JSON.stringify(signupRequestDto)], {type: 'application/json'}))
        formData.append('imageUrl', imageFile);

        try {
          const data = await AuthService.registerUser(formData);
          console.log('Registration successful', data);
          alert("Registration successful");
          navigate('/login'); // 성공 시 로그인 페이지로 리다이렉트
        } catch (error) {
            console.error('Registration failed', error);
            alert("Registration failed");
        }
    };

    return (
        <div className={styles.registerContainer}>
            <form onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="birthDate">Birth Date:</label>
                    <input type="date" id="birthDate" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="gender">Select Gender:</label>
                    <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)} required>
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>                
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="imageFile">Profile Image:</label>
                    <input type="file" id="imageFile" onChange={(e) => setImageFile(e.target.files[0])}/>
                </div>
                
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default RegisterPage;
