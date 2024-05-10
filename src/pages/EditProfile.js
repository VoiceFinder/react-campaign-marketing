import React, { useState, useEffect } from 'react';
import { getUserInfo, updateUserInfo } from '../services/api';
import { useNavigate } from 'react-router-dom';
import styles from '../assets/styles/EditProfile.module.css';

function EditProfile() {
    const [userInfo, setUserInfo] = useState({
        username: '',
        email: '',
        gender: '',
        birthDate: '',
        blogUrl: '',
        bio: '',
        job: '',
        interest: '',
        activityArea: '',
        customJob: '',
        customInterest: ''
    });
    const [imageFile, setImageFile] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const data = await getUserInfo();
                setUserInfo({
                    ...data,
                    customJob: data.job,
                    customInterest: data.interest,
                });
            } catch (error) {
                console.error('Failed to fetch user info:', error);
            }
        };
        fetchUserInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps

    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const updateRequestDto = {};
        Object.keys(userInfo).forEach(key => {
            updateRequestDto[key] = userInfo[key];  
        });
        formData.append('userData', new Blob([JSON.stringify(updateRequestDto)], {type: 'application/json'}))
        formData.append('imageUrl', imageFile);
      
        try {
            await updateUserInfo(formData);
            navigate('/profile');
        } catch (error) {
            console.error('Failed to update user info:', error);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Edit Your Profile</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Profile Image:
                    <input type="file" id="imageFile" onChange={(e) => setImageFile(e.target.files[0])}/>
                </label>
                <label>
                    Name:
                    <input type="text" name="username" value={userInfo.username} onChange={handleChange} readOnly/>
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={userInfo.email} onChange={handleChange} readOnly/>
                </label>
                <label>
                    Gender:
                    <select name="gender" value={userInfo.gender} onChange={handleChange}>
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>                
                </label>
                <label>
                    Birth Date:
                    <input type="date" name="birthDate" value={userInfo.birthDate} onChange={handleChange} />
                </label>
                <label>
                    Blog URL:
                    <input type="text" name="blogUrl" value={userInfo.blogUrl} onChange={handleChange} />
                </label>
                <label>
                    Bio:
                    <textarea name="bio" value={userInfo.bio} onChange={handleChange}></textarea>
                </label>
                <label>
                    Activity Area:
                    <select name="activityArea" value={userInfo.activityArea} onChange={handleChange}>
                        <option value="">Select activityArea</option>
                        <option value="Seoul">Seoul</option>
                        <option value="Busan">Busan</option>
                        <option value="Incheon">Incheon</option>
                        <option value="Daegu">Daegu</option>
                        <option value="Gwangju">Gwangju</option>
                        <option value="Daejeon">Daejeon</option>
                        <option value="Ulsan">Ulsan</option>
                    </select>
                </label>
                <label>
                    Job:
                    <select name="job" value={userInfo.job} onChange={handleChange}>
                        <option value="">Select job</option>
                        <option value="Software Engineer">Software Engineer</option>
                        <option value="Designer">Designer</option>
                        <option value="Teacher">Teacher</option>
                        <option value="Other">Other</option>
                    </select>
                    <input type="text" name="customJob" placeholder='직접입력' value={userInfo.customJob} onChange={handleChange} />
                    
                </label>
                <label>
                    Interest:
                    <select name="interest" value={userInfo.interest} onChange={handleChange}>
                        <option value="">Select interest</option>
                        <option value="Programming">Programming</option>
                        <option value="Design">Design</option>
                        <option value="Education">Education</option>
                        <option value="Other">Other</option>
                    </select>
                    <input type="text" name="customInterest" placeholder='직접입력' value={userInfo.customInterest} onChange={handleChange} />
                    
                </label>
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
}

export default EditProfile;
