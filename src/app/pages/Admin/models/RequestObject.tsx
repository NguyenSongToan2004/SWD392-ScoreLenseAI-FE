
export interface BilliardTableRequest {
  tableType: string;
  name: string;
  description: string;
  status: "inUse" | "available" | "underMaintainance";
  cameraUrl: string;
  storeID: string;
  active: boolean;
}

export interface ModeRequest {
  name: string;
  description: string;
  active: boolean;
}

export interface PermissionRequest {
  name: string;
  description: string;
}

export interface UserAccountRequest {
  name: string;
  email: string;
  phoneNumber: string;
  dob: string;
  address: string;
  password: string;
  role: string;
  managerID: string;
  storeID: string;
}

export interface EditUserAccountRequest {
  name: string;
  email: string;
  phoneNumber: string;
  dob: string;
  address: string;
  status: 'active' | 'inActive';
  role: string;
  managerID: string;
  storeID: string;
}

export interface AddPermissionRequest {
  name: string;
  description: string;
  permissions: string[]
}

export interface StoreRequest {
  name: string;
  address: string;
  status: 'activate' | 'closed';
  description: string;
}

export interface BilliardTable {
  billardTableID: string;
  tableCode: string;
  tableType: string;
  name: string;
  description: string;
  status: 'available' | 'inUse' | 'underMaintainance';
  qrCode: string;
  cameraUrl: string;
  active: boolean;
}

export interface Store {
  storeID: string;
  name: string;
  address: string;
  status: 'activate' | 'closed';
  description: string;
  billiardTables: BilliardTable[];
}

export interface StoreDetailData {
  totalTables: number;
  currentlyPlaying: number;
  availableTables: number;
  brokenTables: number;
  customers: {
    customerName: string;
    matchCount: number;
  }[];
}
