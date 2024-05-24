import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CampaignService from '../services/CampaignService';
import styles from '../assets/styles/CampaignForm.module.css';

function CampaignForm() {
    const { marketId } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [keywords, setKeywords] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [images, setImages] = useState([]);
    const [imageNames, setImageNames] = useState([]);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setImages(e.target.files);
        const imageNamesArray = Array.from(e.target.files).map(file => file.name);
        setImageNames(imageNamesArray);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const keywordList = keywords.split(',').map(keyword => keyword.trim());

        const campaignRequestDto = {
            marketId,
            title,
            description,
            startDate,
            endDate,
            keywords: keywordList
        };
        formData.append('campaignData', new Blob([JSON.stringify(campaignRequestDto)], { type: 'application/json' }));
        Array.from(images).forEach(image => {
            formData.append('images', image);
        });

        try {
            await CampaignService.createCampaign(formData);
            alert('Campaign created successfully!');
            navigate(`/market/${marketId}/manage`);
        } catch (error) {
            console.error('Failed to create campaign:', error);
            alert('Failed to create campaign.');
        }
    };

    return (
        <div className={styles.formContainer}>
            <h2>Create Campaign</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="keywords">Keywords (comma separated)</label>
                    <input
                        type="text"
                        id="keyword"
                        value={keywords}
                        onChange={(e) => setKeywords(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="startDate">Start Date</label>
                    <input
                        type="date"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="endDate">End Date</label>
                    <input
                        type="date"
                        id="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="images">Images</label>
                    <input
                        type="file"
                        id="images"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>
                {imageNames.length > 0 && (
                    <div className={styles.selectedFiles}>
                        <p>Selected files:</p>
                        {imageNames.map((imageName, index) => (
                            <p key={index}>{imageName}</p>
                        ))}
                    </div>
                )}
                <button type="submit">Create Campaign</button>
            </form>
        </div>
    );
}

export default CampaignForm;
