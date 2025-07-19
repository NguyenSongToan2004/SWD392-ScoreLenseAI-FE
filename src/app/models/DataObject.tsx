export interface BilliardMatch {
    billiardMatchID: number;
    billiardTableID: string; // Sửa lỗi chính tả từ 'billard'
    modeID: number;
    byStaff: string | null;
    byCustomer: string | null;
    setUp: string;
    winner: "TEAM A" | "TEAM B" | null;
    startTime: string;
    endTime: string | null;
    totalSet: number;
    status: "pending" | "ongoing" | "completed" | "cancelled";
    code: string;
    sets: GameSet[];
    teams: Team[];
}

export interface Player {
    playerID: number;
    name: string;
    totalScore: number;
    customerID: string | null;
    status: "win" | "loss" | "draw"; // Sử dụng union type để tăng type-safety
    createAt: string; // Có thể dùng kiểu Date nếu bạn có bước chuyển đổi
    teamID: number | null; // Có thể null lúc khởi tạo
}

export interface GameSet {
    billiardMatchID: number;
    gameSetID: number;
    gameSetNo: number;
    raceTo: number;
    winner: string | null;
    startTime: string;
    endTime: string | null;
    status: 'cancelled' | 'completed' | 'forfeited' | 'ongoing' | 'pending' | string;
}

export interface Team {
    billiardMatchID: number;
    teamID: number;
    name: string;
    totalMember: number;
    totalScore: number;
    createAt: string;
    status: 'draw' | 'lose' | 'pending' | 'win' | string;
    players: Player[]; // Mảng các đối tượng Player
}

interface Permission {
    name: string;
    description: string;
}

export interface Role {
    name: string;
    description: string;
    permissions: Permission[];
}

export interface User {
    staffID?: string;
    customerID?: string;
    name: string;
    email: string;
    phoneNumber: string;
    dob: string;
    address: string;
    role: string | null;
    createAt: string;
    updateAt: string | null;
    status: "active" | "inActive";
    manager: string | null;
    imageUrl: string | null;
    store?: Store
}

export interface Staff {
    staffID?: string;
    customerID?: string;
    name: string;
    email: string;
    phoneNumber: string;
    dob: string;
    address: string;
    role: string | null;
    createAt: string;
    updateAt: string | null;
    status: "active" | "inActive";
    manager: string | null;
    imageUrl: string | null;
    store?: Store
}

export interface AuthResponse {
    authenticated: boolean;
    accessToken: string;
    refreshToken: string;
    user: User;
    userType: string;
}

export interface Store {
    storeID: string;
    name: string;
    address: string;
    status: 'active' | 'inactive' | string;
    description: string;
}

export interface BilliardTable {
    billardTableID: string;
    tableCode: string;
    tableType: string;
    name: string;
    description: string;
    status: "inUse" | "available" | "underMaintainance";
    active: boolean;
    storeID: string,
    cameraUrl: string,
    matchResponse?: BilliardMatch
}

export interface TableOperationRequest {
    operationType: "register" | string;
    tableID: string;
    token: string;
}

export interface Customer {
    customerID: string;
    name: string;
    email: string;
    phoneNumber: string | null;
    dob: string;
    address: string;
    createAt: string;
    updateAt: string | null;
    type: "normal" | "vip" | string;
    status: "active" | "inactive" | string;
    imageUrl: string | null;
}


