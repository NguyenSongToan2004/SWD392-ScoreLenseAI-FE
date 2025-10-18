import axios from "../../../../settings/AxiosClient";
import type { AuthResponse } from "../../../models/DataObject";
import type ResponseAPI from "../../../models/ResponseAPI"; // Kiểu trả về từ API
import type { GoogleUserData, RegisterResponse } from "../models/auth";
import axiosDefault from "axios";

// const DOMAIN_API = import.meta.env.VITE_API_URL;
const IDENTITY_BASE_PATH = import.meta.env.VITE_IDENTITY_BASE_PATH;

export const loginAPI = async (email: string, password: string): Promise<ResponseAPI> => {

    const response = await axios.post(`${IDENTITY_BASE_PATH}/login-customer`,
        { email, password },
    );

    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data as AuthResponse,
    };

    if (response.status === 200) {
        let authResponse: AuthResponse = result.data;
        localStorage.setItem("accessToken", authResponse.accessToken);
        localStorage.setItem('isAuth', "true");
        localStorage.setItem("customerID", authResponse.customerDto.customerId);
        localStorage.setItem('customerName', authResponse.customerDto.customerName);
        localStorage.setItem("email", authResponse.customerDto.email);
        // localStorage.setItem('user', authResponse.user);
    }

    return result;
};

export const registerAPI = async (email: string, password: string): Promise<ResponseAPI> => {

    const response = await axios.post(`${IDENTITY_BASE_PATH}/register`,
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

    const response = await axios.post(`${IDENTITY_BASE_PATH}/login-google`,
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
        localStorage.setItem("accessToken", authResponse.accessToken);
        localStorage.setItem('isAuth', "true");
        localStorage.setItem("customerID", authResponse.customerDto.customerId);
        localStorage.setItem('customerName', authResponse.customerDto.customerName);
        localStorage.setItem("email", authResponse.customerDto.email);
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

export const resetPasswordAPI = async (email: string, otp: string, newPassword: string): Promise<ResponseAPI> => {
    const response = await axios.post(`${IDENTITY_BASE_PATH}/forgot-password`, {
        email,
        newPassword,
        otp
    });

    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data,
    };

    return result;
};


export const forgotPasswordAPI = async (email: string): Promise<ResponseAPI> => {

    const response = await axios.post(`${IDENTITY_BASE_PATH}/sent-otp`, {
        email
    });

    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data,
    };

    return result;
};




