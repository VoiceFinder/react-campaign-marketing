import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CampaignService from '../services/CampaignService';
import styles from '../assets/styles/CampaignDetail.module.css';

function CampaignDetail() {
    const { campaignId } = useParams();
    const [campaign, setCampaign] = useState(null);

    useEffect(() => {
        const fetchCampaignDetails = async () => {
            try {
                const data = await CampaignService.getCampaignById(campaignId);
                setCampaign(data);
            } catch (error) {
                console.error('Failed to fetch campaign details:', error);
            }
        };

        fetchCampaignDetails();
    }, [campaignId]);

    if (!campaign) return <div>Loading...</div>;

    return (
        <div className={styles.detailContainer}>
            <h2>{campaign.title}</h2>
            <div className={styles.marketInfo}>
                <p><strong>Market Name:</strong> {campaign.marketName}</p>
                <p><strong>Address:</strong> {campaign.address}</p>
            </div>
            <div className={styles.campaignInfo}>
                <p><strong>Description:</strong> {campaign.description}</p>
                <p><strong>Keywords:</strong></p>
                <ul>
                    {(campaign.keywords || []).map((keyword, index) => (
                        <li key={index}>{keyword}</li>
                    ))}
                </ul>
                <p><strong>Start Date:</strong> {new Date(campaign.startDate).toLocaleDateString()}</p>
                <p><strong>End Date:</strong> {new Date(campaign.endDate).toLocaleDateString()}</p>
                <div className={styles.images}>
                    {campaign.imageUrls.map((imageUrl, index) => (
                        <img key={index} src={imageUrl} alt={`Campaign ${index}`} className={styles.image} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CampaignDetail;
