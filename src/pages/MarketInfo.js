import React from 'react';
import styles from '../assets/styles/MarketManagePage.module.css';

const MarketInfo = ({ market, onEdit }) => (
    <div className={styles.marketInfoCard}>
        <h2>{market.companyName}</h2>
        <img src={market.imageUrls[0] || 'default-image.png'} alt={market.companyName} />
        <p><strong>Business Type:</strong> {market.businessType}</p>
        <p><strong>Phone:</strong> {market.phone}</p>
        <p><strong>Address:</strong> {market.address}</p>
        <p><strong>Description:</strong> {market.description}</p>
        <div className={styles.keywords}>
            {market.keywords && market.keywords.map((keyword, index) => (
                <span key={index} className={styles.keyword}>{keyword}</span>
            ))}
        </div>
        <button onClick={onEdit} className={styles.editButton}>Edit Market</button>
    </div>
);

export default MarketInfo;
