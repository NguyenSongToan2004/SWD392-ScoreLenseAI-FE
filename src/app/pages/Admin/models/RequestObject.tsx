
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
