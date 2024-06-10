import React, { useState, useEffect } from 'react';
import UserService from '../../services/UserService';  
import { useNavigate } from 'react-router-dom';
import styles from '../../assets/styles/EditProfile.module.css';

const considerationOptions = [
    '기타', '할인 및 프로모션', '거리', '주차의 편리함', '부대시설', '예약의 용이함', 
    '교통의 편리성', '메뉴의 다양성', '음식의 양', '음식의 맛', '건강에 좋은 요리', 
    '분위기', '서비스 정도', '가격 수준', '음식점의 청결도'
];

function EditProfile() {
    const [userInfo, setUserInfo] = useState({
        username: '',
        email: '',
        gender: '',
        birthDate: '',
        blogUrl: '',
        bio: '',
        job: '',
        activityArea: '',
        considerations: [],
        fav_foods: '',
        cant_foods: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const data = await UserService.getUserInfo();
                setUserInfo({
                    ...data,
                    considerations: data.considerations || [],
                    fav_foods: data.fav_foods ? data.fav_foods.join(', ') : '',
                    cant_foods: data.cant_foods ? data.cant_foods.join(', ') : ''
                });
            } catch (error) {
                console.error('Failed to fetch user info:', error);
            }
        };
        fetchUserInfo();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleConsiderationChange = (e) => {
        const { options } = e.target;
        const selectedOptions = [];
        for (const option of options) {
            if (option.selected) {
                selectedOptions.push(option.value);
            }
        }

        setUserInfo(prevState => {
            let newConsiderations = [...prevState.considerations];

            selectedOptions.forEach(option => {
                if (newConsiderations.includes(option)) {
                    newConsiderations = newConsiderations.filter(item => item !== option);
                } else if (newConsiderations.length < 3) {
                    newConsiderations.push(option);
                }
            });

            return {
                ...prevState,
                considerations: newConsiderations
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const updateRequestDto = {};
        Object.keys(userInfo).forEach(key => {
            if (['considerations', 'fav_foods', 'cant_foods'].includes(key)) {
                updateRequestDto[key] = key === 'considerations' ? userInfo[key] : userInfo[key].split(',').map(item => item.trim());
            } else {
                updateRequestDto[key] = userInfo[key];
            }
        });
        formData.append('userData', new Blob([JSON.stringify(updateRequestDto)], {type: 'application/json'}));
        formData.append('imageUrl', imageFile);
      
        try {
            await UserService.updateUserInfo(formData);  
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
                    <select name="gender" value={userInfo.gender || ''} onChange={handleChange}>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>                
                </label>
                <label>
                    Birth Date:
                    <input type="date" name="birthDate" value={userInfo.birthDate || ''} onChange={handleChange} />
                </label>
                <label>
                    Blog URL:
                    <input type="text" name="blogUrl" value={userInfo.blogUrl || ''} onChange={handleChange} />
                </label>
                <label>
                    Bio:
                    <textarea name="bio" value={userInfo.bio || ''} onChange={handleChange}></textarea>
                </label>
                <label>
                    Activity Area:
                    <select name="activityArea" value={userInfo.activityArea || ''} onChange={handleChange}>
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
                    <input type="text" name="job" value={userInfo.job || ''} onChange={handleChange} />
                </label>
                <label>
                    Considerations (Select up to 3):
                    <select 
                        name="considerations" 
                        multiple 
                        value={userInfo.considerations} 
                        onChange={handleConsiderationChange} 
                        className={styles.considerationsSelect}
                    >
                        {considerationOptions.map(option => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Favorite Foods:
                    <input type="text" name="fav_foods" placeholder='comma separated' value={userInfo.fav_foods || ''} onChange={handleChange} />
                </label>
                <label>
                    Foods You Can't Eat:
                    <input type="text" name="cant_foods" placeholder='comma separated' value={userInfo.cant_foods || ''} onChange={handleChange} />
                </label>
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
}

export default EditProfile;
