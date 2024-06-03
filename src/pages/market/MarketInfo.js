import React, { useState } from 'react';
import styles from '../../assets/styles/MarketInfo.module.css';
import { FaEllipsisV } from 'react-icons/fa'; 


function MarketInfo({ market, onEdit, onDelete }) {
    const [showOptions, setShowOptions] = useState(false);

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    return (
        <div className={styles.marketInfoCard}>
            <div className={styles.header}>
                <h2>{market.companyName}</h2>
                <div className={styles.toggleContainer}>
                    <button onClick={toggleOptions} className={styles.toggleButton}><FaEllipsisV /></button>
                    {showOptions && (
                        <div className={styles.options}>
                            <button onClick={onEdit} className={styles.editButton}>Edit</button>
                            <button onClick={onDelete} className={styles.deleteButton}>Delete</button>
                        </div>
                    )}
                </div>
            </div>
            <img src={market.imageUrls[0] || 'default-image.png'} alt={market.companyName} />
            <p><strong>Business Type:</strong> {market.businessType}</p>
            <p><strong>Phone:</strong> {market.phone}</p>
            <p><strong>Address:</strong> {market.address} {market.detailAddress}</p>
            <p><strong>Description:</strong> {market.description}</p>
            <div className={styles.keywords}>
                {market.keywords && market.keywords.map((keyword, index) => (
                    <span key={index} className={styles.keyword}>{keyword}</span>
                ))}
            </div>
        </div>
    );
}

export default MarketInfo;
