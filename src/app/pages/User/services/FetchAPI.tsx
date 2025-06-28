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