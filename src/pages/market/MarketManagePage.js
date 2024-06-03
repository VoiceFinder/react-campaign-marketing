import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MarketService from '../../services/MarketService';
import CampaignService from '../../services/CampaignService';
import MarketInfo from './MarketInfo';
import CampaignList from '../campaign/CampaignList';
import MarketAnalytics from './MarketAnalytics';
import styles from '../../assets/styles/MarketManagePage.module.css';

function MarketManagePage() {
    const { marketId } = useParams();
    const [market, setMarket] = useState(null);
    const [campaigns, setCampaigns] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMarketDetails = async () => {
            try {
                const marketData = await MarketService.getMarketById(marketId);
                setMarket(marketData);

                const campaignData = await CampaignService.getCampaignsByMarketId(marketId, page, 2); // 2개씩 가져오기
                setCampaigns(campaignData.content || []);
                setTotalPages(campaignData.totalPages);

            } catch (error) {
                console.error('Failed to fetch market details:', error);
            }
        };

        fetchMarketDetails();
    }, [marketId, page]);

    const handleEditMarket = () => {
        navigate(`/market/${marketId}/edit`);
    };

    const handleDeleteMarket = async () => {
        if (window.confirm('Are you sure you want to delete this market?')) {
            try {
                await MarketService.deleteMarket(marketId);
                alert('Market deleted successfully!');
                navigate('/markets');
            } catch (error) {
                console.error('Failed to delete market:', error);
                alert('Failed to delete market.');
            }
        }
    };

    const handleCreateCampaign = () => {
        navigate(`/market/${marketId}/create-campaign`);
    };

    const handleCampaignClick = (campaignId) => {
        navigate(`/campaign/${campaignId}`);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <div className={styles.dashboardContainer}>
            {market && (
                <div className={styles.mainContent}>
                    <div className={styles.marketInfoSection}>
                        <MarketInfo 
                            market={market} 
                            onEdit={handleEditMarket} 
                            onDelete={handleDeleteMarket} 
                        />
                    </div>

                    <div className={styles.campaignInfoSection}>
                        <CampaignList
                            campaigns={campaigns}
                            onCampaignClick={handleCampaignClick}
                            onCreateCampaign={handleCreateCampaign}
                            page={page}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            )}
            <MarketAnalytics />
        </div>
    );
}

export default MarketManagePage;
