import axios from "../../../settings/AxiosClient";
import type ResponseAPI from "../../models/ResponseAPI";

export const fetchCustomerInfoAPI = async (): Promise<ResponseAPI> => {
    const response: ResponseAPI = await axios.get(`/v1/customers/my-profile`);
    
    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data,
    }

    return result;
}