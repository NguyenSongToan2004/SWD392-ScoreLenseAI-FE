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
    status: "pending" | "ongoing" | "finished" | "cancelled";
    code: string;
    sets: GameSet[]; // Mảng các đối tượng GameSet
    teams: Team[];   // Mảng các đối tượng Team
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

interface Role {
    name: string;
    description: string;
    permissions: Permission[];
}

interface User {
    staffID?: string;
    customerID?: string;
    name: string;
    email: string;
    phoneNumber: string;
    dob: string;
    address: string;
    roles: Role[];
    createAt: string;
    updateAt: string | null;
    status: string;
    manager: string | null;
}

export interface AuthResponse {
    authenticated: boolean;
    accessToken: string;
    refreshToken: string;
    user: User;
    userType: string;
}

