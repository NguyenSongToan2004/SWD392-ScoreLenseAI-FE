import axios from "../../../../settings/AxiosClient"
import type ResponseAPI from "../../../models/ResponseAPI"
import type { SavePlayerRequest } from "../models/PartialModel";

export const fetchMatchAPI = async (id: string): Promise<ResponseAPI> => {
    const response: ResponseAPI = await axios.get(`/v1/billiard-matches/${Number(id)}`);

    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data,
    }

    return result;
}

export const updateScoreAPI = async (matchID: number, teamID: number, delta: string): Promise<ResponseAPI> => {
    const updateType = "score";
    const response: ResponseAPI = await axios.put(`/v3/billiard-matches`,
        {
            updateType,
            matchID,
            teamID,
            delta,
        }
    );

    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data,
    }

    return result;
}

export const cancelMatchAPI = async (matchID: number, forfeitTeamID: number, updateType: "cancel"): Promise<ResponseAPI> => {

    const response: ResponseAPI = await axios.put(`/v3/billiard-matches`,
        {
            updateType,
            matchID,
            forfeitTeamID
        }
    );

    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data,
    }

    return result;
}

export const savePlayerAPI = async (form: SavePlayerRequest): Promise<ResponseAPI> => {
    const response: ResponseAPI = await axios.put(`/v3/players`,
        form
    );

    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data,
    }

    return result;
}

export const setManualAPI = async (matchID: number): Promise<ResponseAPI> => {
    const response: ResponseAPI = await axios.put(`/v1/billiard-matches/manual/${matchID}`
    );

    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data,
    }

    return result;
}