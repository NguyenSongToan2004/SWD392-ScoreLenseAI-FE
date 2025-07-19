import axios from "../../../../settings/AxiosClient";
import type ResponseAPI from "../../../models/ResponseAPI";
import type { MatchSetup } from "../models/DataObject";

export const fetchModeAPI = async (): Promise<ResponseAPI> => {
    try {
        const response = await axios.get('/v1/modes');

        const result: ResponseAPI = {
            status: response.status,
            message: response.data.message,
            data: response.data.data,
        };

        if (response.status === 200) {
            // console.log('Login successful:', result.data);
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
}

export const fetchModeTestAPI = async (id: number): Promise<ResponseAPI> => {
    try {
        const response = await axios.get(`/v1/modes/${id}`);

        const result: ResponseAPI = {
            status: response.status,
            message: response.data.message,
            data: response.data.data,
        };

        if (response.status === 200) {
            console.log('Mode :', result.data);
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
}
export const createBillardMatchAPI = async (matchSetUp: MatchSetup): Promise<ResponseAPI> => {
    try {
        // Sửa lỗi: Truyền thẳng object `matchSetUp` làm body cho request.
        const response = await axios.post('/v3/billiard-matches', matchSetUp);

        const result: ResponseAPI = {
            status: response.status,
            message: response.data.message,
            data: response.data.data,
        };

        // Giả sử status 201 (Created) cũng là một thành công cho POST request
        if (response.status === 200 || response.status === 201) {
            console.log('API call successful:', result.data);
        } else {
            console.warn(`Unexpected response status: ${response.status}`);
        }

        return result;
    } catch (error: unknown) {
        // Bạn có thể xử lý lỗi từ Axios chi tiết hơn
        if (error instanceof Error) {
            console.error('General error: ' + error.message);
            throw new Error('An unknown error occurred');
        } else {
            console.error('Unknown error:', error);
            throw new Error('An unknown error occurred');
        }
    }
}

export const fetchTableAPI = async (tableID: string): Promise<ResponseAPI> => {
    try {
        const response = await axios.get(`/v2/tables/${tableID}`);

        const result: ResponseAPI = {
            status: response.status,
            message: response.data.message,
            data: response.data.data,
        };

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
}

export const logoutAPI = async (): Promise<ResponseAPI> => {
    try {
        const response = await axios.post("/v2/auth/logout");

        const result: ResponseAPI = {
            status: response.status,
            message: response.data.message,
            data: response.data.data,
        };

        if (response.status !== 200) {
            console.warn(`Unexpected response status: ${response.status}`);
        } else {
            console.log('Log out thành công !');
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
}


