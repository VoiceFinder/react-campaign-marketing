import axiosInstance from './AxiosConfig';

class AuthService {
    static async registerUser(formData) {
        const response = await axiosInstance.post('/users/signup', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    }
}

export default AuthService;
