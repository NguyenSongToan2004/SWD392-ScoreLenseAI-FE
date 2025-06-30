import axios from "../../settings/AxiosClient"
import type ResponseAPI from "../models/ResponseAPI";

export const introspectAPI = async (): Promise<ResponseAPI> => {
    const response = await axios.get(`/v2/auth/introspect`);

    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data,
    };

    return result;
}