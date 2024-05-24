import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MarketService from '../services/MarketService';
import styles from '../assets/styles/MarketRegistrationForm.module.css';

function MarketRegistrationForm() {
    const [businessCertificate, setBusinessCertificate] = useState(null);
    const [companyName, setCompanyName] = useState('');
    const [businessType, setBusinessType] = useState('');
    const [companyPhotos, setCompanyPhotos] = useState([]);
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [keywords, setKeywords] = useState('');
    const [fileNames, setFileNames] = useState([]);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === "businessCertificate") {
            setBusinessCertificate(files[0]);
        } else if (name === "companyPhotos") {
            setCompanyPhotos(Array.from(files));
            setFileNames(Array.from(files).map(file => file.name));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const keywordList = keywords.split(',').map(keyword => keyword.trim());
        const marketData = {
            companyName,
            businessType,
            phone,
            address,
            description,
            keywords: keywordList
        };

        formData.append('marketData', new Blob([JSON.stringify(marketData)], { type: 'application/json' }));
        formData.append('businessCertificate', businessCertificate);
        companyPhotos.forEach(photo => {
            formData.append('companyPhotos', photo);
        });

        try {
            console.log(formData);
            await MarketService.registerMarket(formData);
            alert('Market registered successfully!');
            navigate('/markets');
        } catch (error) {
            console.error('Failed to register market:', error);
            alert('Failed to register market.');
        }
    };

    return (
        <div className={styles.registrationFormContainer}>
            <h2>Register Your Market</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="businessCertificate">Business Certificate</label>
                    <input type="file" name="businessCertificate" onChange={handleFileChange} required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="companyName">Company Name</label>
                    <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Company Name" required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="businessType">Business Type</label>
                    <input type="text" value={businessType} onChange={(e) => setBusinessType(e.target.value)} placeholder="Business Type" required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="phone">Phone Number</label>
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="address">Address</label>
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="description">Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="keywords">Keywords (comma separated)</label>
                    <input type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="Keywords (comma separated)" required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="companyPhotos">Company Photos</label>
                    <input type="file" name="companyPhotos" multiple accept="image/*" onChange={handleFileChange} />
                </div>
                {fileNames.length > 0 && (
                    <div>
                        <p>Selected files:</p>
                        {fileNames.map((fileName, index) => (
                            <p key={index}>{fileName}</p>
                        ))}
                    </div>
                )}
                <button type="submit">Register Market</button>
            </form>
        </div>
    );
}

export default MarketRegistrationForm;
