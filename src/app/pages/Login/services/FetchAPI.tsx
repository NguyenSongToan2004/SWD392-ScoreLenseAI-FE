import axios from "../../../../settings/AxiosClient";
import type { AuthResponse } from "../../../models/DataObject";
import type ResponseAPI from "../../../models/ResponseAPI"; // Kiểu trả về từ API

// const DOMAIN_API = import.meta.env.VITE_API_URL;

const loginAPI = async (email: string, password: string): Promise<ResponseAPI> => {
    try {
        const response = await axios.post(`/v2/auth/login`,
            { email, password },
        );

        const result: ResponseAPI = {
            status: response.status,
            message: response.data.message,
            data: response.data.data as AuthResponse,
        };

        if (response.status === 200) {
            let authResponse: AuthResponse = result.data;
            console.log('Login successful:', result.data);
            localStorage.setItem('role', authResponse.userType);
            localStorage.setItem('isAuth', authResponse.authenticated + '');
            if (authResponse.user.customerID != null)
                localStorage.setItem('userID', authResponse.user.customerID);
            if (authResponse.user.staffID != null)
                localStorage.setItem('userID', authResponse.user.staffID);
            localStorage.setItem('customerName', authResponse.user.name);
            // localStorage.setItem('user', authResponse.user);
        } else {
            console.warn(`Unexpected response status: ${response.status}`);
        }

        return result;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('General error: ' + error.message);
            throw new Error('An unknown error occurred');
        } else {
            console.error('Unknown error:', error);
            throw new Error('An unknown error occurred');
        }
    }
};

export default loginAPI;
