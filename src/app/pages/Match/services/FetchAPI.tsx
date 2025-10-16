import axios from "../../../../settings/AxiosClient"
import type { SearchRequest } from "../../../models/ModelExtensions/SearchExtensions";
import type ResponseAPI from "../../../models/ResponseAPI"
import type { SavePlayerRequest } from "../models/PartialModel";

export interface BilliardMatchSearchRequest extends SearchRequest {
  queryType:
    | 'byId'
    | 'byCustomer'
    | 'byStaff'
    | 'byPlayer'
    | 'filter'
    | 'byTable';
  tableId?: string;        // required if queryType=byTable
  matchId?: number | null;        // required if queryType=byId
  customerId?: string;     // required if queryType=byCustomer
  staffId?: string;        // required if queryType=byStaff
  playerId?: number;       // required if queryType=byPlayer
  date?: string;           // ISO datetime string (e.g., '2025-10-16T00:00:00Z')
  status?: string;         // e.g. 'pending', 'active', 'finished'
  modeID?: number;         // optional filter for mode
}

export class DefaultBilliardMatchSearchRequest implements BilliardMatchSearchRequest {
  // 🧭 Từ SearchRequest
  page = 1;
  size = 10;
  sortBy = "startTime";
  sortDirection: "asc" | "desc" = "desc";

  queryType:
    | "byId"
    | "byCustomer"
    | "byStaff"
    | "byPlayer"
    | "filter"
    | "byTable" = "byId";

    matchId : number | null = null;
}

const BILLIARD_BASE_PATH = import.meta.env.VITE_BILLIARD_BASE_PATH;


export const fetchMatchAPI = async (id: string): Promise<ResponseAPI> => {
    const req = new DefaultBilliardMatchSearchRequest;
    req.matchId = Number(id);
    const response: ResponseAPI = await axios.get(`${BILLIARD_BASE_PATH}/billiard-matches`);

    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data,
    }

    return result;
}

export const updateScoreAPI = async (matchID: number, teamID: number, delta: string): Promise<ResponseAPI> => {
    const updateType = "score";
    const response: ResponseAPI = await axios.put(`${BILLIARD_BASE_PATH}/billiard-matches`,
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

    const response: ResponseAPI = await axios.put(`${BILLIARD_BASE_PATH}/billiard-matches`,
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
    const response: ResponseAPI = await axios.put(`${BILLIARD_BASE_PATH}/players`,
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
    const response: ResponseAPI = await axios.put(`${BILLIARD_BASE_PATH}/billiard-matches`,
        {
            updateType : "manual",
            matchID : matchID
        }
    );

    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data ?? null,   
    }

    return result;
}