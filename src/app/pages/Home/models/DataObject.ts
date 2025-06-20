export interface TeamConfig {
    name: string;
    totalMember: number;
    memberNames: string[]
}

export interface MatchSetup {
    billiardTableID: string;
    modeID: number | null;
    staffID: string | null; // Có thể là null
    customerID: string | null;
    setUp: string;
    totalSet: number;
    raceTo: number;
    teamConfigs: TeamConfig[]; // Mảng các team config
}

export interface Mode {
    modeID: number;
    name: string;
    description: string;
    active: boolean;
}

export interface BilliardTable {
    billiardTableID: string;
    tableCode: string;
    tableType: string;
    name: string;
    description: string;
    status: "inUse" | "available" | "underMaintainance";
    storeName: string;
    active: boolean;
}


