import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MarketService from '../../services/MarketService';
import styles from '../../assets/styles/MarketListPage.module.css';

function MarketListPage() {
    const [markets, setMarkets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMarkets = async () => {
            try {
                const data = await MarketService.fetchMarkets();
                setMarkets(data.content);
            } catch (error) {
                console.error('Failed to fetch markets:', error);
            }
        };

        fetchMarkets();
    }, []);

    const handleRegisterMarket = () => {
        navigate('/register-market');
    };

    const handleMarketClick = (marketId) => {
        navigate(`/market/${marketId}/manage`);
    };

    return (
        <div className={styles.marketContainer}>
            {markets.length > 0 ? (
                <div className={styles.marketList}>
                    {markets.map((market) => (
                        <div key={market.id} className={styles.marketCard} onClick={() => handleMarketClick(market.id)}>
                            <img src={market.imageUrls[0] || 'default-image.png'} alt={market.companyName} />
                            <h2>{market.companyName}</h2>
                            <p><strong>Business Type:</strong> {market.businessType}</p>
                            <p><strong>Phone:</strong> {market.phone}</p>
                            <p><strong>Address:</strong> {market.address} {market.detailAdress}</p>
                            <p><strong>Description:</strong> {market.description}</p>
                            <div className={styles.keywords}>
                                {market.keywords.map((keyword, index) => (
                                    <span key={index} className={styles.keyword}>{keyword}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                
            ) : (
                <div>
                    <p>No markets registered yet.</p>
                </div>
            )}
          <button onClick={handleRegisterMarket} className={styles.registerButton}>Register a New Market</button>

        </div>
    );
}

export default MarketListPage;
