import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CampaignService from '../../services/CampaignService';
import styles from '../../assets/styles/CampaignListPage.module.css';

function CampaignListPage() {
    const [campaigns, setCampaigns] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const data = await CampaignService.getCampaigns(page, 4, searchTerm);
                setCampaigns(data.content);
                
                const total = await CampaignService.getTotalPages();
                setTotalPages(Math.ceil(total/3));
            } catch (error) {
                console.error('Failed to fetch campaigns:', error);
            }
        };

        fetchCampaigns();
    }, [page, searchTerm]);

    const handleCampaignClick = (campaignId) => {
        navigate(`/campaign/${campaignId}`);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleSearch = (e) => {
        setPage(0); // 검색어가 변경될 때 페이지를 처음으로 설정
    };

    return (
        <div className={styles.campaignContainer}>
            <div className={styles.searchContainer}>
              <input
                  type="text"
                  placeholder="Search Campaigns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.searchInput}
              />
              <button className={styles.searchButton} onClick={handleSearch}>Search</button>
            </div>
          
            <div className={styles.campaignSection}>
                <h3>Campaigns</h3>
                <div className={styles.campaignList}>
                    {campaigns.map((campaign) => (
                        <div key={campaign.id} className={styles.campaignCard} onClick={() => handleCampaignClick(campaign.id)}>
                            <img src={campaign.imageUrls[0] || 'default-image.png'} alt={campaign.title} />
                            <h4>{campaign.marketName}</h4>
                            <p>{campaign.title}</p>
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
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 0}
                    >
                        Previous
                    </button>
                    <span>Page {page + 1} of {totalPages}</span>
                    <button
                        className={styles.pageButton}
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page + 1 === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CampaignListPage;
