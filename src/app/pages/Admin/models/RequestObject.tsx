export interface BilliardTableRequest {
  tableType: string;
  name: string;
  description: string;
  status: "inUse" | "available" | "underMaintainance";
  cameraUrl: string;
  storeID: string;
  active: boolean;
}