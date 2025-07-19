import type { Staff } from "../../../models/DataObject";

export interface StaffResponse {
    staffID: string;
    name: string;
    email: string;
    phoneNumber: string;
    dob: string;
    address: string;
    roles: string[];
    createAt: string;
    updateAt: string | null;
    status: string;
    manager: string | null;
    imageUrl: string | null;
    store: string;
}

export interface Permission {
    name: string;
    description: string;
}

export interface ListStaffResponse {
    content: Staff[],
    page: number,
    size: number,
    totalElements: number,
    totalPages: number,
    last: boolean
    first: boolean
    empty: boolean
    sortBy: string
    sortDirection: string
}

export interface AddPermissionResponse {
    name: string;
    description: string;
    permissions: Permission[]
}

export interface Customer {
  customerName: string;
  matchCount: number;
}

export interface BilliardStats {
  totalTables: number;
  currentlyPlaying: number;
  availableTables: number;
  brokenTables: number;
  customers: Customer[];
}
