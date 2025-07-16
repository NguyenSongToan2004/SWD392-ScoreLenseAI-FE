import axios from "../../../../settings/AxiosClient";
import type ResponseAPI from "../../../models/ResponseAPI";
import type { AddPermissionRequest, BilliardTableRequest, EditUserAccountRequest, ModeRequest, PermissionRequest, UserAccountRequest } from "../models/RequestObject";

export const fetchTablesAPI = async (storeID: string): Promise<ResponseAPI> => {
    const response = await axios.get(`/v2/tables/list/${storeID}`);

    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data
    }

    return result;
}

export const editTablesAPI = async (table: BilliardTableRequest, id: string): Promise<ResponseAPI> => {
    const response = await axios.put(`/v1/tables/${id}`,
        table
    );

    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data
    }

    return result;
}

export const createTablesAPI = async (table: BilliardTableRequest): Promise<ResponseAPI> => {
    const response = await axios.post(`/v1/tables`,
        table
    );

    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data
    }

    return result;
}

export const deleteTablesAPI = async (tableID: string): Promise<ResponseAPI> => {
    const response = await axios.delete(`/v1/tables/${tableID}`);

    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data
    }

    return result;
}

export const fetchModesAPI = async (): Promise<ResponseAPI> => {
    const response = await axios.get(`/v1/modes`);

    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data
    }

    return result;
}

export const createModeAPI = async (form: ModeRequest): Promise<ResponseAPI> => {
    const response = await axios.post(`/v1/modes`, form);

    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data
    }

    return result;
}

export const getModeAPI = async (modeId: string): Promise<ResponseAPI> => {
    const response = await axios.get(`/v1/modes/${modeId}`);

    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data
    }

    return result;
}

export const deleteModeAPI = async (modeId: number): Promise<ResponseAPI> => {
    const response = await axios.delete(`/v1/modes/${modeId}`);

    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data
    }

    return result;
}

export const editModeAPI = async (form: ModeRequest, modeId: number): Promise<ResponseAPI> => {
    const response = await axios.put(`/v1/modes/${modeId}`, form);

    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data
    }

    return result;
}

export const fetchPermissionAPI = async (): Promise<ResponseAPI> => {
    const response = await axios.get(`/v1/permissions`);

    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data
    }

    return result;
}

export const createPermissionAPI = async (form: PermissionRequest): Promise<ResponseAPI> => {
    const response = await axios.post(`/v1/permissions`, form);

    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data
    }

    return result;
}

export const getPermissionAPI = async (permissionName: string): Promise<ResponseAPI> => {
    const response = await axios.get(`/v1/permissions/${permissionName}`);

    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data
    }

    return result;
}

export const deletePermissionAPI = async (permissionName: string): Promise<ResponseAPI> => {
    const response = await axios.delete(`/v1/permissions/${permissionName}`);

    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data
    }

    return result;
}

export const fetchStaffsAPI = async (params?: {
    page?: number;
    size?: number;
    sortBy?: string;
    sortDirection?: string;
    search?: string;
    status?: string;
    storeId?: string;
}): Promise<ResponseAPI> => {
    // Build query string from parameters
    const queryParams = new URLSearchParams();

    if (params?.page !== undefined) queryParams.append('page', params.page.toString());
    if (params?.size !== undefined) queryParams.append('size', params.size.toString());
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params?.sortDirection) queryParams.append('sortDirection', params.sortDirection);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.status) queryParams.append('status', params.status);
    if (params?.storeId) queryParams.append('storeId', params.storeId);

    // const queryString = queryParams.toString();
    // const url = queryString ? `/v1/staffs?${queryString}` : '/v1/staffs';

    const response = await axios.get('/v2/staffs', {
        params: queryParams,
    });

    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data
    }

    return result;
}

export const fetchAllStaffsAPI = async (): Promise<ResponseAPI> => {
    const response = await axios.get(`/v1/staffs`);

    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data
    }

    return result;
}

export const getStaffAPI = async (staffId: string): Promise<ResponseAPI> => {
    const response = await axios.get(`/v1/staffs/${staffId}`);

    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data
    }

    return result;
}

export const createStaffAPI = async (form: UserAccountRequest): Promise<ResponseAPI> => {
    const response = await axios.post(`/v1/staffs`, form);

    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data
    }

    return result;
}

export const editStaffAPI = async (form: EditUserAccountRequest, staffId: string): Promise<ResponseAPI> => {
    const response = await axios.put(`/v1/staffs/${staffId}`, form);

    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data
    }

    return result;
}

export const fetchStoreAPI = async (storeID: string): Promise<ResponseAPI> => {
    const response = await axios.get(`/v1/stores/${storeID}`);

    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data
    }

    return result;
}

export const fetchRolesAPI = async (): Promise<ResponseAPI> => {
    const response = await axios.get(`/v1/roles`);

    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data
    }

    return result;
}

export const createRoleAPI = async (form: AddPermissionRequest): Promise<ResponseAPI> => {
    const response = await axios.post(`/v1/roles`, form);

    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data
    }

    return result;
}

export const deleteRoleAPI = async (roleName: string): Promise<ResponseAPI> => {
    const response = await axios.delete(`/v1/roles/${roleName}`);

    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data
    }

    return result;
}

export const getRoleAPI = async (roleName: string): Promise<ResponseAPI> => {
    const response = await axios.get(`/v1/roles/${roleName}`);

    const result: ResponseAPI = {
        status: response.status,
        message: response.data.message,
        data: response.data.data
    }

    return result;
}







