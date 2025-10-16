// Object Recieve

export interface Player {
    playerID: number;
    name: string;
    totalScore: number;
    customerID: string | null;
    status: "win" | "loss" | "draw"; // Sử dụng union type để tăng type-safety
    createAt: string; // Có thể dùng kiểu Date nếu bạn có bước chuyển đổi
    teamID: number | null; // Có thể null lúc khởi tạo
}

/**
 * Đại diện cho thông tin của một đội trong trận đấu.
 */
export interface Team {
    teamID: number;
    billiardMatchID: number;
    name: string;
    totalMember: number;
    totalScore: number;
    createAt: string;
    status: "win" | "loss" | "draw";
    players: Player[]; // Mảng các đối tượng Player
}

/**
 * Đại diện cho thông tin của một ván đấu (set) trong trận.
 */
export interface GameSet {
    gameSetID: number;
    billiardMatchID: number;
    gameSetNo: number;
    raceTo: number;
    winner: "TEAM A" | "TEAM B" | null; // Có thể là tên đội hoặc ID
    startTime: string;
    endTime: string | null;
    status: "pending" | "ongoing" | "finished" | "cancelled";
}

/**
 * Đại diện cho toàn bộ đối tượng trận đấu Billiard nhận về từ API.
 * Đây là interface chính bạn sẽ sử dụng.
 */
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


// Object Send
export interface TeamConfig {
    name: string;
    totalMember: number;
    memberNames: string[]
}

export interface MatchSetup {
    billiardTableID: string;
    modeID: number | null;
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
    billardTableID: string;
    tableCode: string;
    tableType: string;
    name: string;
    description: string;
    status: "inUse" | "available" | "underMaintainance";
    storeName: string;
    active: boolean;
}


