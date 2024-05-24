import axiosInstance from './AxiosConfig';

class MarketService {
    static async registerMarket(marketData) {
        const response = await axiosInstance.post('/markets', marketData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    }

    static async fetchMarkets() {
        const response = await axiosInstance.get('/markets');
        return response.data;
    }

    static async getMarketById(id) {
        const response = await axiosInstance.get(`/markets/${id}`);
        return response.data;
    }

    static async updateMarket(id, marketData) {
        const response = await axiosInstance.put(`/markets/${id}`, marketData);
        return response.data;
    }

    static async deleteMarket(id) {
        const response = await axiosInstance.delete(`/markets/${id}`);
        return response.data;
    }
}

export default MarketService;
