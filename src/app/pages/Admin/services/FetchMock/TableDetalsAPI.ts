// src/pages/admin/services/FetchAPI.mock.ts
import type {
  BilliardTable,
  BilliardMatch,
  Player,
} from "../../../../models/DataObject";

/**
 * 🧩 Mock Players (đÃ CHUẨN HÓA THEO MODEL MỚI)
 * - status: "win" | "loss" | "draw"
 * - customerID: string | null
 * - teamID: number | null
 */
const mockPlayersA: Player[] = [
  {
    playerID: 1,
    name: "Nguyen Van A",
    totalScore: 5,
    customerID: "CUS001",
    status: "draw",
    createAt: new Date().toISOString(),
    teamID: 1,
  },
  {
    playerID: 2,
    name: "Tran Thi B",
    totalScore: 3,
    customerID: "CUS002",
    status: "draw",
    createAt: new Date().toISOString(),
    teamID: 1,
  },
];

const mockPlayersB: Player[] = [
  {
    playerID: 3,
    name: "Le Hoang C",
    totalScore: 4,
    customerID: "CUS003",
    status: "draw",
    createAt: new Date().toISOString(),
    teamID: 2,
  },
  {
    playerID: 4,
    name: "Pham D",
    totalScore: 2,
    customerID: "CUS004",
    status: "draw",
    createAt: new Date().toISOString(),
    teamID: 2,
  },
];

/**
 * 🧩 Mock Matches
 */
const mockMatches: BilliardMatch[] = [
  {
    billiardMatchID: 1001,
    billiardTableID: "TBL001",
    modeID: 2,
    byStaff: "staff01",
    byCustomer: null,
    setUp: "Standard setup",
    winner: null,
    startTime: new Date(Date.now() - 20 * 60 * 1000).toISOString(), // started 20 mins ago
    endTime: null,
    totalSet: 3,
    status: "ongoing",
    code: "MATCH001",
    sets: [
      {
        billiardMatchID: 1001,
        gameSetID: 1,
        gameSetNo: 1,
        raceTo: 7,
        winner: null,
        startTime: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
        endTime: null,
        status: "ongoing",
      },
    ],
    teams: [
      {
        billiardMatchID: 1001,
        teamID: 1,
        name: "TEAM A",
        totalMember: 2,
        totalScore: 2,
        createAt: new Date().toISOString(),
        status: "pending",
        players: mockPlayersA,
      },
      {
        billiardMatchID: 1001,
        teamID: 2,
        name: "TEAM B",
        totalMember: 2,
        totalScore: 1,
        createAt: new Date().toISOString(),
        status: "pending",
        players: mockPlayersB,
      },
    ],
  },
  {
    billiardMatchID: 1002,
    billiardTableID: "TBL003",
    modeID: 4,
    byStaff: "staff02",
    byCustomer: "cust11",
    setUp: "3-cushion setup",
    winner: "TEAM B",
    startTime: new Date(Date.now() - 60 * 60 * 1000).toISOString(), // started 1 hour ago
    endTime: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    totalSet: 5,
    status: "completed",
    code: "MATCH002",
    sets: [
      {
        billiardMatchID: 1002,
        gameSetID: 2,
        gameSetNo: 1,
        raceTo: 15,
        winner: "TEAM B",
        startTime: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
        endTime: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
        status: "completed",
      },
    ],
    teams: [
      {
        billiardMatchID: 1002,
        teamID: 3,
        name: "TEAM A",
        totalMember: 1,
        totalScore: 1,
        createAt: new Date().toISOString(),
        status: "lose",
        players: [
          {
            playerID: 5,
            name: "Pham Van D",
            totalScore: 1,
            customerID: "CUS005",
            status: "loss", // người chơi bên đội thua
            createAt: new Date().toISOString(),
            teamID: 3,
          },
        ],
      },
      {
        billiardMatchID: 1002,
        teamID: 4,
        name: "TEAM B",
        totalMember: 1,
        totalScore: 2,
        createAt: new Date().toISOString(),
        status: "win",
        players: [
          {
            playerID: 6,
            name: "Tran Thanh",
            totalScore: 2,
            customerID: "CUS006",
            status: "win", // người chơi bên đội thắng
            createAt: new Date().toISOString(),
            teamID: 4,
          },
        ],
      },
    ],
  },
];

/**
 * 🧩 Mock Tables
 */
const mockTables: BilliardTable[] = [
  {
    billardTableID: "TBL001",
    tableCode: "01",
    tableType: "9ft Pool",
    name: "Diamond Pro 9ft",
    description: "Professional 9ft table with tournament setup.",
    status: "inUse",
    active: true,
    storeID: "STORE001",
    cameraUrl: "https://camera.poolhub.vn/01",
    matchResponse: mockMatches[0],
  },
  {
    billardTableID: "TBL002",
    tableCode: "02",
    tableType: "Carom 3C",
    name: "Gabriels Prestige",
    description: "Carom table for high-level practice.",
    status: "available",
    active: true,
    storeID: "STORE001",
    cameraUrl: "https://camera.poolhub.vn/02",
  },
  {
    billardTableID: "TBL003",
    tableCode: "03",
    tableType: "Carom 3C",
    name: "Riley Aristocrat",
    description: "Carom 3-cushion table, currently in tournament.",
    status: "inUse",
    active: true,
    storeID: "STORE001",
    cameraUrl: "https://camera.poolhub.vn/03",
    matchResponse: mockMatches[1],
  },
  {
    billardTableID: "TBL004",
    tableCode: "04",
    tableType: "Pool 8ft",
    name: "Brunswick Gold Crown",
    description: "Casual pool table for relaxed sessions.",
    status: "available",
    active: true,
    storeID: "STORE001",
    cameraUrl: "https://camera.poolhub.vn/04",
  },
  {
    billardTableID: "TBL005",
    tableCode: "05",
    tableType: "10ft Snooker",
    name: "Rasson Victory",
    description: "Under maintenance for cloth replacement.",
    status: "underMaintainance",
    active: false,
    storeID: "STORE001",
    cameraUrl: "https://camera.poolhub.vn/05",
  },
];

/**
 * 🔸 Utility delay simulation
 */
function simulateDelay<T>(data: T, ms = 500): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

/**
 * 🟢 Mock API: Fetch Billiard Tables by storeID
 */
export async function fetchTablesAPI(storeID: string) {
  const filtered = mockTables.filter((t) => t.storeID === storeID);
  return simulateDelay({
    status: 200,
    data: filtered.length > 0 ? filtered : mockTables,
    message: `Fetched mock tables for store ${storeID}`,
  });
}
