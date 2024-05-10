import React, { useEffect, useState } from 'react';
import { getUserInfo } from '../services/api';
import { useNavigate } from 'react-router-dom';
import styles from '../assets/styles/Profile.module.css'; 
import defaultProfileImage from '../assets/images/default_profile_image.png';

function Profile() {
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const data = await getUserInfo();
                setUserInfo(data);
            } catch (error) {
                console.error('Failed to fetch user info:', error);
            }
        };

        fetchUserInfo();
    }, []);

    // 부가 정보 확인
    const isAdditionalInfoMissing = userInfo && (
      !userInfo.gender || !userInfo.birthDate || !userInfo.blogUrl || !userInfo.bio || !userInfo.job || !userInfo.interest || !userInfo.activityArea
    );

    return (
        <div className={styles.container}>
            <h1 className={styles.profileHeader}>Profile</h1>
            {userInfo ? (
                <div className={styles.profileInfo}>
                    <img src={userInfo.imageUrl || defaultProfileImage} alt="Profile" className={styles.profileImage} />
                    <p><strong>Name:</strong> {userInfo.username}</p>
                    <p><strong>Email:</strong> {userInfo.email}</p>
                    <p><strong>Gender:</strong> {userInfo.gender || 'N/A'}</p>
                    <p><strong>Birth Date:</strong> {userInfo.birthDate || 'N/A'}</p>
                    <p><strong>Blog:</strong> {userInfo.blogUrl || 'N/A'}</p>
                    <p><strong>Bio:</strong> {userInfo.bio || 'N/A'}</p>
                    <p><strong>Job:</strong> {userInfo.job || 'N/A'}</p>
                    <p><strong>Interest:</strong> {userInfo.interest || 'N/A'}</p>
                    <p><strong>Activity Area:</strong> {userInfo.activityArea || 'N/A'}</p>
                    {isAdditionalInfoMissing && (
                        <div>
                            <p className={styles.alert}>Please update your additional information.</p>
                        </div>
                    )}
                    <button onClick={() => navigate('/edit-profile')} className={styles.editButton}>Edit Profile</button>

                </div>
            ) : (
                <p className={styles.loading}>Loading user information...</p>
            )}
        </div>
    );
}

export default Profile;
