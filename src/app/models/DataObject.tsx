export interface BilliardMatch {
    billiard_matchid: number; // Primary Key, Auto Increment
    code: string | null;
    end_time: string | null;         // ISO string format for datetime
    start_time: string | null;       // ISO string format for datetime
    status: 'cancelled' | 'completed' | 'forfeited' | 'ongoing' | 'pending';
    winner: string | null;
    billard_tableid: string | null;
    by_staff: string | null;
    modeid: number | null;
    total_round: number | null;
    by_customer: string | null;
}

export interface Team {
    teamid: number; // Primary Key, Auto Increment
    create_at: string; // ISO string format, from datetime(6)
    name: string;
    status: 'draw' | 'lose' | 'pending' | 'win'; // enum
    total_score: number;
    billiard_matchid: number; // Foreign key liên kết trận đấu
}

export interface Mode {
    modeid: number;            // Primary Key, Auto Increment
    description: string;       // tinytext → string
    is_active: boolean;        // bit(1) → boolean
    name: string;              // varchar(50) → string
}

export interface Staff {
    staffid: string; // Primary Key (varchar(10))
    address: string;
    create_at: string; // date → string (ISO format or 'YYYY-MM-DD')
    dob: string;       // date
    email: string;
    name: string;
    password: string;
    phone_number: string; // varchar(10)
    role: 'ADMIN' | 'MANAGER' | 'STAFF'; // enum
    status: 'active' | 'inactive';       // enum
    update_at: string; // date
    managerid: string; // varchar(10), FK
}

export interface BilliardTable {
    billard_tableid: string; // Primary Key (varchar(50))
    description: string;     // tinytext → string
    is_active: boolean;      // bit(1) → boolean
    name: string;            // varchar(50)
    status: 'available' | 'inUse' | 'underMaintainance'; // enum
    table_type: 'Carom' | 'Pool'; // enum
    storeid: string;         // FK to store (varchar(50))
    table_code: string;      // mã bàn, varchar(10)
}








