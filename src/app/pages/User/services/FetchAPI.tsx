import axios from "../../../../settings/AxiosClient";
import type { SearchRequest } from "../../../models/ModelExtensions/SearchExtensions";
import type ResponseAPI from "../../../models/ResponseAPI";

const BILLIARD_BASE_PATH = import.meta.env.VITE_BILLIARD_BASE_PATH;
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
    | "byTable" = "byCustomer";

    matchId : number | null = null;
    customerId : string = "";
}

export const fetchHistoryMatchAPI = async (userID: string): Promise<ResponseAPI> => {
    const req = new DefaultBilliardMatchSearchRequest;
    req.customerId = userID;
    const response = await axios.get(`${BILLIARD_BASE_PATH}/billiard-matches`, {
        params : req
    });

    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data,
    };

    return result;
}

interface BilliadTableSearchRequest extends SearchRequest{
    queryType : "all" | "byId" | "byStore",
    tableId : string | null,
    storeId : string | null,
    status : "available" | "inUse" | "underMaintainance" | null
}

class DefaultBilliardTableSearchRequest implements BilliadTableSearchRequest {
  // 🧭 Từ SearchRequest
  page = 1;
  size = 10;
  sortBy = "billardTableID";
  sortDirection: "asc" | "desc" = "asc";

  // 🎯 Riêng cho BilliardTableSearchRequest
  queryType: "all" | "byId" | "byStore" = "all";
  tableId: string | null = null;
  storeId: string | null = null;
  status: "available" | "inUse" | "underMaintainance" | null = "available";
}

export const fetchTableAPI = async (tableID: string): Promise<ResponseAPI> => {
    const req = new DefaultBilliardTableSearchRequest;
        req.queryType = "byId";
        req.tableId = tableID;
        req.status = null

    const response = await axios.get(`${BILLIARD_BASE_PATH}/tables`, {
        params : req
    });

    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data,
    };

    return result;
}

interface ModeRequest extends SearchRequest{
    queryType : "all"| "byId",
    modeId : number | null,
}

class DefaultModeRequest implements ModeRequest {
  page = 1
  size = 10
  sortBy = "modeID"
  sortDirection = "asc"
  queryType: "all" | "byId" = "all"
  modeId = null
} 

export const fetchModeAPI = async (): Promise<ResponseAPI> => {
    const req = new DefaultModeRequest;
    const response = await axios.get(`${BILLIARD_BASE_PATH}/modes`, {
        params : req
    });

    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data,
    };

    return result;
}