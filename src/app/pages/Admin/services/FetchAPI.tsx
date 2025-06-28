import type ResponseAPI from "../../../models/ResponseAPI";
import axios from "../../../../settings/AxiosClient"

export const fetchTablesAPI = async (tableID: string): Promise<ResponseAPI> => {
    const response = await axios.get(`/v2/tables/${tableID}`);

    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data
    }

    return result;
}