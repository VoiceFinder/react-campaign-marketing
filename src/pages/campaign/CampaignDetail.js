import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CampaignService from '../../services/CampaignService';
import styles from '../../assets/styles/CampaignDetail.module.css';

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

    useEffect(() => {
        if (campaign && window.kakao && window.kakao.maps) {
            displayMap(campaign.address);
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
          console.log(address);
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

    if (!campaign) return <div>Loading...</div>;

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
        </div>
    );
}

export default CampaignDetail;
