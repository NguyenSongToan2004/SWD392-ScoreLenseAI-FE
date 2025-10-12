import axios from "../../../../settings/AxiosClient";
import type { AuthResponse } from "../../../models/DataObject";
import type ResponseAPI from "../../../models/ResponseAPI"; // Kiểu trả về từ API
import type { GoogleUserData, RegisterResponse } from "../models/auth";
import axiosDefault from "axios";

// const DOMAIN_API = import.meta.env.VITE_API_URL;

export const loginAPI = async (userName: string, password: string): Promise<ResponseAPI> => {

    const response = await axios.post(`/identity/api/login`,
        { userName, password },
    );

    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data as AuthResponse,
    };

    if (response.status === 200) {
        let authResponse: AuthResponse = result.data;
        localStorage.setItem('role', authResponse.userType);
        localStorage.setItem('isAuth', authResponse.authenticated + '');
        if (authResponse.user.customerID != null)
            localStorage.setItem('userID', authResponse.user.customerID);
        if (authResponse.user.staffID != null)
            localStorage.setItem('userID', authResponse.user.staffID);
        localStorage.setItem('customerName', authResponse.user.name);
        if (authResponse.user.store) {
            localStorage.setItem('storeID', authResponse.user.store.storeID);
        }
        // localStorage.setItem('user', authResponse.user);
    }

    return result;
};

export const registerAPI = async (email: string, password: string): Promise<ResponseAPI> => {

    const response = await axios.post(`/v2/auth/register`,
        { email, password },
    );

    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data as RegisterResponse,
    };

    return result;
};


export const loginGoogleAPI = async (email: string, name: string, picture: string): Promise<ResponseAPI> => {
    console.log(email)
    console.log(name)
    console.log(picture)

    const response = await axios.post(`/v2/auth/login-google`,
        {
            email,
            name,
            picture
        },
    );

    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data as AuthResponse,
    };

    if (response.status === 200) {
        let authResponse: AuthResponse = result.data;
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
};


export const decodeAccessToken = async (access_token: string): Promise<GoogleUserData> => {

    const response = await axiosDefault.get(`${import.meta.env.VITE_GOOGLE_GET_INFO_API}`,
        {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        }
    );

    return response.data;

};

export const resetPasswordAPI = async (resetToken: string, newPassword: string, confirmPassword: string): Promise<ResponseAPI> => {
    const response = await axios.post(`/v2/auth/password-reset`, {
        resetToken,
        newPassword,
        confirmPassword
    });

    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data,
    };

    return result;
};


export const forgotPasswordAPI = async (email: string): Promise<ResponseAPI> => {

    const response = await axios.post(`/v2/auth/password-forgot`, {
        email
    });

    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data,
    };

    return result;
};




