import axiosInstance from './AxiosConfig';

class CampaignService {
    static async getCampaignsByMarketId(marketId, page, size) {
      const response = await axiosInstance.get(`/markets/${marketId}/campaigns`, {
          params: { page, size }
      });
      return response.data;
    }

    static async getCampaigns(page, size, keyword) {
      const response = await axiosInstance.get(`/campaigns`, {
          params: { page, size, keyword }
      });
      return response.data;
    }

    static async getTotalPages() {
      const response = await axiosInstance.get(`/campaigns/totalPage`);
      return response.data;
    }

    static async createCampaign(formData) {
        const response = await axiosInstance.post(`/campaigns`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    }

    static async updateCampaign(campaignId, formData) {
        const response = await axiosInstance.put(`/campaigns/${campaignId}`, formData);
        return response.data;
    }

    static async deleteCampaign(campaignId) {
        const response = await axiosInstance.delete(`/campaigns/${campaignId}`);
        return response.data;
    }

    static async getCampaignById(campaignId) {
        const response = await axiosInstance.get(`/campaigns/${campaignId}`);
        return response.data;
    }

    static async getRecommendCampaigns() {
      const response = await axiosInstance.get(`/campaigns/recommend`);
      return response.data;
  }
}

export default CampaignService;
