import axiosInstance from './AxiosConfig';

class UserService {
    static async getUserInfo() {
        const response = await axiosInstance.get('/users/profile');
        return response.data;
    }

    static async updateUserInfo(userInfo) {
        const response = await axiosInstance.post('/users/profile', userInfo, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    }
}

export default UserService;
