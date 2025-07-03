import axios from "../../../../settings/AxiosClient";
import type ResponseAPI from "../../../models/ResponseAPI";

export const fetchHistoryMatchAPI = async (userID: string): Promise<ResponseAPI> => {
    const response = await axios.get(`/v1/billiardmatches/bycustomer/${userID}`);

    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data,
    };

    return result;
}

export const fetchTableAPI = async (tableID: string): Promise<ResponseAPI> => {
    const response = await axios.get(`/v1/tables/${tableID}`);

    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data,
    };

    return result;
}

export const fetchModeAPI = async (): Promise<ResponseAPI> => {

    const response = await axios.get('/v1/modes');

    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data,
    };

    return result;
}