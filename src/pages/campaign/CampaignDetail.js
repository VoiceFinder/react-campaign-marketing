import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import CampaignService from '../../services/CampaignService';
import styles from '../../assets/styles/CampaignDetail.module.css';

function CampaignDetail() {
    const { campaignId } = useParams();
    const [campaign, setCampaign] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [marketId, setMarketId] = useState(null); 

    useEffect(() => {
        const fetchCampaignDetails = async () => {
            try {
                const data = await CampaignService.getCampaignById(campaignId);
                setCampaign(data);
                setMarketId(data.marketId); 
            } catch (error) {
                console.error('Failed to fetch campaign details:', error);
            }
        };

        fetchCampaignDetails();
    }, [campaignId]);

    useEffect(() => {
        if (campaign && window.kakao && window.kakao.maps) {
            const mapContainer = document.getElementById('map');
            if (mapContainer) {
                mapContainer.style.width = '100%';
                mapContainer.style.height = '400px'; // 원하는 높이로 설정
                displayMap(campaign.address);
            }
        }
    }, [campaign]);

    const displayMap = (address) => {
        const { kakao } = window;
        const mapContainer = document.getElementById('map');
        const mapOption = {
            center: new kakao.maps.LatLng(37.5665, 126.9780), // Default center (Seoul)
            level: 3
        };

        const map = new kakao.maps.Map(mapContainer, mapOption);
        const geocoder = new kakao.maps.services.Geocoder();

        geocoder.addressSearch(address, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
                console.log("주소 검색", status);
                const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                new kakao.maps.Marker({
                    map: map,
                    position: coords
                });
                map.setCenter(coords);
            } else {
              console.error("주소 검색 실패:", status);
            }
        });
    };

    const handleEdit = () => {
        navigate(`/biz/campaign/${campaignId}/edit`);
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this campaign?')) {
            try {
                await CampaignService.deleteCampaign(campaignId);
                alert('Campaign deleted successfully!');
                navigate(`/biz/market/${marketId}/manage`);
            } catch (error) {
                console.error('Failed to delete campaign:', error);
            }
        }
    };

    if (!campaign) return <div>Loading...</div>;

    const isBizPage = location.pathname.startsWith('/biz');

    return (
        <div className={styles.detailContainer}>
            <div className={styles.images}>
              {campaign.imageUrls.map((imageUrl, index) => (
                  <img key={index} src={imageUrl} alt={`Campaign ${index}`} className={styles.image} />
              ))}
            </div>
            <h3>{campaign.title}</h3>
            <div className={styles.campaignInfo}>
                <p>{campaign.description}</p>
                <p><strong>Keywords:</strong>
                  <ul className={styles.keywords}>
                      {(campaign.keywords || []).map((keyword, index) => (
                          <li className={styles.keyword} key={index}>{keyword}</li>
                      ))}
                  </ul>
                </p>
                <p><strong>Date:</strong> {new Date(campaign.startDate).toLocaleDateString()} ~ {new Date(campaign.endDate).toLocaleDateString()}</p>
            </div>
            <hr></hr>
            <div className={styles.marketInfo}>
                <p><strong>Market Name:</strong> {campaign.marketName}</p>
                <p><strong>Address:</strong> {campaign.address} {campaign.detailAddress}</p>
            </div>
            <div id="map" className={styles.map}></div>
            {isBizPage && (
                <div className={styles.buttonContainer}>
                    <button onClick={handleEdit} className={styles.editButton}>Edit</button>
                    <button onClick={handleDelete} className={styles.deleteButton}>Delete</button>
                </div>
            )}
        </div>
    );
}

export default CampaignDetail;
