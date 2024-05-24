import axiosInstance from './AxiosConfig';
import Cookies from 'js-cookie';

class UserService {
    static async getUserInfo() {
        const token = Cookies.get('Authorization');
        const response = await axiosInstance.get('/users/profile', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }

    static async updateUserInfo(userInfo) {
        const token = Cookies.get('Authorization');
        const response = await axiosInstance.post('/users/profile', userInfo, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    }
}

export default UserService;
