export interface BilliardMatch {
    billiardMatchID: number;
    billiardTableID: string;
    modeID: number;
    byStaff: string | null;
    byCustomer: string | null;
    setUp: 'Customize' | '1 vs 1' | 'Scotch Double' | '2 vs 2';
    winner: string | null;
    startTime: string;
    endTime: string | null;
    totalSet: number;
    status: 'cancelled' | 'completed' | 'forfeited' | 'ongoing' | 'pending' | string;
    code: string;
    sets: GameSet[];
    teams: Team[];
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
}
