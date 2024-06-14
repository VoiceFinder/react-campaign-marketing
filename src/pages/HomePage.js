import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CampaignService from '../services/CampaignService';
import styles from '../assets/styles/HomePage.module.css';
import backgroundImg from '../assets/images/eventBg.png';
import bizImg from '../assets/images/bizBg.png';
import { useAuth } from '../context/AuthContext';


function HomePage() {
    const [campaigns, setCampaigns] = useState([]);
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMarketAndCampaignDetails = async () => {
            try {
              let campaignData;
              if (isAuthenticated) {
                  campaignData = await CampaignService.getRecommendCampaigns();
              } else {
                  campaignData = await CampaignService.getRecentCampaigns();
              }                
              setCampaigns(campaignData.content || []);
            } catch (error) {
                console.error('Failed to fetch market and campaign details:', error);
            }
        };

        fetchMarketAndCampaignDetails();
    }, [isAuthenticated]);

    const handleInfoClick = () => {
      navigate(`/about`);
    };
    const handleBizInfoClick = () => {
      navigate(`/biz`);
    };
    const handleCampaignClick = (campaignId) => {
      navigate(`/campaign/${campaignId}`);
    };

    return (
        <div className={styles.homeContainer}>
            <div className={styles.info} onClick={handleInfoClick}>
                <img src={backgroundImg} alt="backgroundImg" className={styles.backgroundImage} />
                <div className={styles.Overlay}>
                    <h1>Welcome to VoiceFinder</h1>
                    <p>캠페인에 참여하고 혜택 받자!</p>
                </div>
            </div>
    

            <div className={styles.campaignSection}>
                <h2>Recommend Campaigns</h2>
                <div className={styles.campaignList}>
                    {campaigns.length > 0 ? (
                        campaigns.map((campaign) => (
                            <div key={campaign.id} className={styles.campaignCard} onClick={() => handleCampaignClick(campaign.id)}>
                                <div className={styles.campaignData}>
                                    <img src={(campaign.imageUrls && campaign.imageUrls[0]) || backgroundImg} alt={campaign.title} className={styles.campaignImage} />
                                    <h4>{campaign.marketName}</h4>
                                    <p>{campaign.title}</p>
                                    <p><strong>기간:</strong> {new Date(campaign.startDate).toLocaleDateString()} ~ {new Date(campaign.endDate).toLocaleDateString()}</p>
                                    <div className={`${styles.status} ${new Date(campaign.endDate) > new Date() ? styles.ongoing : styles.ended}`}>
                                        {new Date(campaign.endDate) > new Date() ? '진행중' : '종료됨'}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No recent campaigns available.</p>
                    )}
                </div>
            </div>

            <div className={styles.bizInfo} onClick={handleBizInfoClick}>
                <img src={bizImg} alt="bizImg" className={styles.backgroundImage} />
                <div className={styles.Overlay}>
                    <h1>광고를 원하시나요?</h1>
                    <p>지금 Biz페이지로 이동해보세요!</p>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
