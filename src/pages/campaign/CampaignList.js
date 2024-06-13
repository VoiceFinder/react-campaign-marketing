import React from 'react';
import styles from '../../assets/styles/CampaignListPage.module.css';
import defaultImage from '../../assets/images/default_background_image.png';

const CampaignList = ({ campaigns, onCampaignClick, onCreateCampaign, page, totalPages, onPageChange }) => (
    <div className={styles.campaignSection}>
        <h3>Campaigns</h3>
        <div className={styles.campaignList}>
            {campaigns.map((campaign) => (
                <div key={campaign.id} className={styles.campaignCard} onClick={() => onCampaignClick(campaign.id)}>
                    <img src={campaign.imageUrls[0] || defaultImage} alt={campaign.title} />
                    <h4>{campaign.title}</h4>
                    <p>{campaign.description}</p>
                    <p><strong>기간:</strong> {new Date(campaign.startDate).toLocaleDateString()} ~ {new Date(campaign.endDate).toLocaleDateString()}</p>
                    <div className={`${styles.status} ${new Date(campaign.endDate) > new Date() ? styles.ongoing : styles.ended}`}>
                        {new Date(campaign.endDate) > new Date() ? '진행중' : '종료됨'}
                    </div>
                </div>
            ))}
        </div>
        <div className={styles.pagination}>
            <button
                className={styles.pageButton}
                onClick={() => onPageChange(page - 1)}
                disabled={page === 0}
            >
                Previous
            </button>
            <span>Page {page + 1} of {totalPages}</span>
            <button
                className={styles.pageButton}
                onClick={() => onPageChange(page + 1)}
                disabled={page + 1 === totalPages}
            >
                Next
            </button>
        </div>
        <button onClick={onCreateCampaign} className={styles.createButton}>Create Campaign</button>
    </div>
);

export default CampaignList;
