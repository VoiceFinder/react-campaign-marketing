import React from 'react';
import { useParams } from 'react-router-dom';

function CampaignDetailPage() {
  let { campaignId } = useParams();

  return (
    <div>
      <h2>Campaign Detail</h2>
      {/* 실제 캠페인 데이터를 불러와서 표시할 구성요소 */}
      <p>Details for campaign ID {campaignId} will be displayed here.</p>
    </div>
  );
}

export default CampaignDetailPage;
