import axios from "../../../../settings/AxiosClient"
import type ResponseAPI from "../../../models/ResponseAPI"

export const fetchMatchAPI = async (id: string): Promise<ResponseAPI> => {
    const response: ResponseAPI = await axios.get(`/v1/billiardmatches/${Number(id)}`);

    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data,
    }

    return result;
}

export const updateScoreAPI = async (matchID: number, teamID: number, delta: string): Promise<ResponseAPI> => {
    const response: ResponseAPI = await axios.put(`/v1/billiardmatches/score`,
        {
            matchID,
            teamID,
            delta
        }
    );

    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data,
    }

    return result;
}