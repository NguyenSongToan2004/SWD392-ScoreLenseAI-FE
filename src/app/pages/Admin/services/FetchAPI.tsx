import type ResponseAPI from "../../../models/ResponseAPI";
import axios from "../../../../settings/AxiosClient"

export const fetchTablesAPI = async (storeID: string): Promise<ResponseAPI> => {
    const response = await axios.get(`/v2/tables/list/${storeID}`);

    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data
    }

    return result;
}