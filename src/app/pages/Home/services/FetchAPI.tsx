import axios from "../../../../settings/AxiosClient";
import type { SearchRequest } from "../../../models/ModelExtensions/SearchExtensions";
import type ResponseAPI from "../../../models/ResponseAPI";
import type { MatchSetup } from "../models/DataObject";
 

const BILLIARD_BASE_PATH = import.meta.env.VITE_BILLIARD_BASE_PATH;
const IDENTITY_BASE_PATH = import.meta.env.VITE_IDENTITY_BASE_PATH;


interface ModeRequest extends SearchRequest{
    queryType : "all"| "byId",
    modeId : number | null,
}

class DefaultModeRequest implements ModeRequest {
  page = 1
  size = 10
  sortBy = ""
  sortDirection = "asc"
  queryType: "all" | "byId" = "all"
  modeId = null
} 

export const fetchModeAPI = async (): Promise<ResponseAPI> => {
    try {
        const req = new DefaultModeRequest()
        const response = await axios.get(`${BILLIARD_BASE_PATH}/modes`,
            {
                params : req
            }
        );
        const result: ResponseAPI = {
            status: response.status,
            message: response.data.message,
            data: response.data.data,
        };

        if (response.status === 200) {
            // console.log('Login successful:', result.data);
        } else {
            console.warn(`Unexpected response status: ${response.status}`);
        }

        return result;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('General error: ' + error.message);
            throw new Error('An unknown error occurred');
        } else {
            console.error('Unknown error:', error);
            throw new Error('An unknown error occurred');
        }
    }
}

// export const fetchModeTestAPI = async (id: number): Promise<ResponseAPI> => {
//     try {
//         const response = await axios.get(`${BILLIARD_BASE_PATH}/modes/${id}`);

//         const result: ResponseAPI = {
//             status: response.status,
//             message: response.data.message,
//             data: response.data.data,
//         };

//         if (response.status === 200) {
//             console.log('Mode :', result.data);
//         } else {
//             console.warn(`Unexpected response status: ${response.status}`);
//         }

//         return result;
//     } catch (error: unknown) {
//         if (error instanceof Error) {
//             console.error('General error: ' + error.message);
//             throw new Error('An unknown error occurred');
//         } else {
//             console.error('Unknown error:', error);
//             throw new Error('An unknown error occurred');
//         }
//     }
// }

export const createBillardMatchAPI = async (matchSetUp: MatchSetup): Promise<ResponseAPI> => {
    try {
        // Sửa lỗi: Truyền thẳng object `matchSetUp` làm body cho request.
        const response = await axios.post(`${BILLIARD_BASE_PATH}/billiard-matches`, matchSetUp);

        const result: ResponseAPI = {
            status: response.status,
            message: response.data.message,
            data: response.data.data,
        };

        // Giả sử status 201 (Created) cũng là một thành công cho POST request
        if (response.status === 200 || response.status === 201) {
            console.log('API call successful:', result.data);
        } else {
            console.warn(`Unexpected response status: ${response.status}`);
        }

        return result;
    } catch (error: unknown) {
        // Bạn có thể xử lý lỗi từ Axios chi tiết hơn
        if (error instanceof Error) {
            console.error('General error: ' + error.message);
            throw new Error('An unknown error occurred');
        } else {
            console.error('Unknown error:', error);
            throw new Error('An unknown error occurred');
        }
    }
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
    try {
        const req = new DefaultBilliardTableSearchRequest;
        req.queryType = "byId";
        req.tableId = tableID;
        req.status = null
        const response = await axios.get(`${BILLIARD_BASE_PATH}/tables`,
            {
                params : req
            }
        );

        const result: ResponseAPI = {
            status: response.status,
            message: response.data.message,
            data: response.data.data,
        };

        return result;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('General error: ' + error.message);
            throw new Error('An unknown error occurred');
        } else {
            console.error('Unknown error:', error);
            throw new Error('An unknown error occurred');
        }
    }
}

export const logoutAPI = async (): Promise<ResponseAPI> => {
    try {
        const response = await axios.post(`${IDENTITY_BASE_PATH}/logout`);

        const result: ResponseAPI = {
            status: response.status,
            message: response.data.message,
            data: response.data.data,
        };

        if (response.status !== 200) {
            console.warn(`Unexpected response status: ${response.status}`);
        } else {
            console.log('Logout successful!');
        }

        return result;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('General error: ' + error.message);
            throw new Error('An unknown error occurred');
        } else {
            console.error('Unknown error:', error);
            throw new Error('An unknown error occurred');
        }
    }
}


