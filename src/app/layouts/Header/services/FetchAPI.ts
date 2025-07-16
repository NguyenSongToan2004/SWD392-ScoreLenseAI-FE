import axios from "../../../../settings/AxiosClient";
import type ResponseAPI from "../../../models/ResponseAPI";

export const fetchCustomerInfoAPI = async (): Promise<ResponseAPI> => {
    const response: ResponseAPI = await axios.get(`/v1/customers/my-profile`);

    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data,
    }

    return result;
}

export const fetchStaffInfoAPI = async (): Promise<ResponseAPI> => {
    const response: ResponseAPI = await axios.get(`/v1/staffs/my-profile`);

    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data,
    }

    return result;
}

export const uploadAvatarAPI = async (customerId: string, file: File): Promise<ResponseAPI> => {
    // FormData is the standard way to send files via HTTP.
    const formData = new FormData();
    // The key 'image' must match what the API expects.
    formData.append('image', file);

    const response = await axios.post(
        `/v1/users/customers/${customerId}/image`,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    );

    // Reshape the response to match your standard ResponseAPI type
    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data,
    };
    return result;

}