import { useState } from "react";
import { FaFilter, FaInfoCircle } from "react-icons/fa";
import MatchDetailModal from "../partials/MatchDetailModal";
import { isOpacityStore } from "../homeStore";
import type { BilliardMatch } from "../../../models/DataObject";

// Mock Data updated to BilliardMatch type
const mockData: BilliardMatch[] = [
    {
        billiardMatchID: 1,
        billiardTableID: "Table-01",
        modeID: 1, // Corresponding to "3-Cushion"
        byStaff: "staff001",
        byCustomer: null,
        setUp: "Standard",
        winner: "TEAM A",
        startTime: "2025-05-01T18:05:00",
        endTime: "2025-05-01T19:05:00",
        totalSet: 3,
        status: "completed",
        code: "MATCH001",
        sets: [
            { billiardMatchID: 1, gameSetID: 1, gameSetNo: 1, raceTo: 15, winner: "TEAM A", startTime: "2025-05-01T18:05:00", endTime: "2025-05-01T18:25:00", status: 'completed' },
            { billiardMatchID: 1, gameSetID: 2, gameSetNo: 2, raceTo: 15, winner: "TEAM B", startTime: "2025-05-01T18:30:00", endTime: "2025-05-01T18:50:00", status: 'completed' },
            { billiardMatchID: 1, gameSetID: 3, gameSetNo: 3, raceTo: 15, winner: "TEAM A", startTime: "2025-05-01T18:55:00", endTime: "2025-05-01T19:05:00", status: 'completed' }
        ],
        teams: [
            {
                billiardMatchID: 1,
                teamID: 1,
                name: "Team A",
                totalMember: 1,
                totalScore: 40,
                createAt: "2025-05-01T18:00:00",
                status: 'win',
                players: [
                    { playerID: 1, name: "Player 1", totalScore: 40, customerID: "cust123", status: "win", createAt: "2025-05-01T18:00:00", teamID: 1 }
                ]
            },
            {
                billiardMatchID: 1,
                teamID: 2,
                name: "Team B",
                totalMember: 1,
                totalScore: 35,
                createAt: "2025-05-01T18:00:00",
                status: 'lose',
                players: [
                    { playerID: 2, name: "Player 2", totalScore: 35, customerID: "cust124", status: "loss", createAt: "2025-05-01T18:00:00", teamID: 2 }
                ]
            }
        ]
    },
    {
        billiardMatchID: 2,
        billiardTableID: "Table-01",
        modeID: 1, // Corresponding to "3-Cushion"
        byStaff: "staff001",
        byCustomer: null,
        setUp: "Standard",
        winner: "TEAM A",
        startTime: "2025-05-01T18:05:00",
        endTime: "2025-05-01T19:05:00",
        totalSet: 3,
        status: "completed",
        code: "MATCH001",
        sets: [
            { billiardMatchID: 1, gameSetID: 1, gameSetNo: 1, raceTo: 15, winner: "TEAM A", startTime: "2025-05-01T18:05:00", endTime: "2025-05-01T18:25:00", status: 'completed' },
            { billiardMatchID: 1, gameSetID: 2, gameSetNo: 2, raceTo: 15, winner: "TEAM B", startTime: "2025-05-01T18:30:00", endTime: "2025-05-01T18:50:00", status: 'completed' },
            { billiardMatchID: 1, gameSetID: 3, gameSetNo: 3, raceTo: 15, winner: "TEAM A", startTime: "2025-05-01T18:55:00", endTime: "2025-05-01T19:05:00", status: 'completed' }
        ],
        teams: [
            {
                billiardMatchID: 1,
                teamID: 1,
                name: "Team A",
                totalMember: 1,
                totalScore: 40,
                createAt: "2025-05-01T18:00:00",
                status: 'win',
                players: [
                    { playerID: 1, name: "Player 1", totalScore: 40, customerID: "cust123", status: "win", createAt: "2025-05-01T18:00:00", teamID: 1 }
                ]
            },
            {
                billiardMatchID: 1,
                teamID: 2,
                name: "Team B",
                totalMember: 1,
                totalScore: 35,
                createAt: "2025-05-01T18:00:00",
                status: 'lose',
                players: [
                    { playerID: 2, name: "Player 2", totalScore: 35, customerID: "cust124", status: "loss", createAt: "2025-05-01T18:00:00", teamID: 2 }
                ]
            }
        ]
    },
    {
        billiardMatchID: 3,
        billiardTableID: "Table-01",
        modeID: 1, // Corresponding to "3-Cushion"
        byStaff: "staff001",
        byCustomer: null,
        setUp: "Standard",
        winner: "TEAM A",
        startTime: "2025-05-01T18:05:00",
        endTime: "2025-05-01T19:05:00",
        totalSet: 3,
        status: "completed",
        code: "MATCH001",
        sets: [
            { billiardMatchID: 1, gameSetID: 1, gameSetNo: 1, raceTo: 15, winner: "TEAM A", startTime: "2025-05-01T18:05:00", endTime: "2025-05-01T18:25:00", status: 'completed' },
            { billiardMatchID: 1, gameSetID: 2, gameSetNo: 2, raceTo: 15, winner: "TEAM B", startTime: "2025-05-01T18:30:00", endTime: "2025-05-01T18:50:00", status: 'completed' },
            { billiardMatchID: 1, gameSetID: 3, gameSetNo: 3, raceTo: 15, winner: "TEAM A", startTime: "2025-05-01T18:55:00", endTime: "2025-05-01T19:05:00", status: 'completed' }
        ],
        teams: [
            {
                billiardMatchID: 1,
                teamID: 1,
                name: "Team A",
                totalMember: 1,
                totalScore: 40,
                createAt: "2025-05-01T18:00:00",
                status: 'win',
                players: [
                    { playerID: 1, name: "Player 1", totalScore: 40, customerID: "cust123", status: "win", createAt: "2025-05-01T18:00:00", teamID: 1 }
                ]
            },
            {
                billiardMatchID: 1,
                teamID: 2,
                name: "Team B",
                totalMember: 1,
                totalScore: 35,
                createAt: "2025-05-01T18:00:00",
                status: 'lose',
                players: [
                    { playerID: 2, name: "Player 2", totalScore: 35, customerID: "cust124", status: "loss", createAt: "2025-05-01T18:00:00", teamID: 2 }
                ]
            }
        ]
    }
];


export default function HistoryTable() {
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    // State để quản lý modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMatch, setSelectedMatch] = useState<BilliardMatch | null>(null);

    // Hàm để mở modal
    const handleOpenModal = (match: BilliardMatch) => {
        setSelectedMatch(match);
        setIsModalOpen(true);
        isOpacityStore.set((prev) => {
            prev.value = true;
        })
    };

    // Hàm để đóng modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedMatch(null);
        isOpacityStore.set((prev) => {
            prev.value = false;
        })
    };

    // A helper function to format data for the table
    const formatMatchForDisplay = (match: BilliardMatch) => ({
        id: match.billiardMatchID,
        match: `${match.teams[0]?.name || 'N/A'} vs ${match.teams[1]?.name || 'N/A'}`,
        mode: `Mode ${match.modeID}`, // You might want a map for mode names e.g. {1: "3-Cushion"}
        winner: match.winner || "N/A",
        date: new Date(match.startTime).toLocaleDateString('en-GB'), // Format as DD-MM-YYYY
        time: new Date(match.endTime ? new Date(match.endTime).getTime() - new Date(match.startTime).getTime() : 0).toISOString().substr(11, 8), // Calculates duration
    });

    // In a real scenario, you'd filter the data based on fromDate and toDate
    const filteredData = mockData;

    return (
        <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-200 h-full flex flex-col z-10">
            <div className="flex flex-row justify-between">
                <h1
                    className="text-6xl font-medium mb-4"
                    style={{ color: `var(--secondary-color)` }}
                >
                    HISTORY
                </h1>

                {/* Filter */}
                <div className="flex items-center gap-3 mb-4 justify-end">
                    <input
                        type="date"
                        className="border-2 border-gray-400 hover:border-green-700 rounded px-3 py-1 text-xl font-thin "
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                    />
                    <span className="text-gray-500 text-xl">→</span>
                    <input
                        type="date"
                        className="border-2 border-gray-400 hover:border-green-700 rounded px-3 py-1 text-xl font-thin"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                    />

                    <button
                        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition cursor-pointer"
                        style={{ backgroundColor: `var(--primary-color)` }}
                    >
                        <FaFilter /> FILTER
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-x-auto overflow-y-auto rounded-2xl">
                <table className="w-full text-center ">
                    <thead className="sticky top-0 z-10 color-table-common color-text-common font-light">
                        <tr className="text-2xl h-min-[30px] font-light">
                            <th className="font-light"></th>
                            <th className="font-black p-2">Match Of</th>
                            <th>Game Mode</th>
                            <th>Winner</th>
                            <th>Date</th>
                            <th>Duration</th>
                            <th>Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item, idx) => {
                            const displayData = formatMatchForDisplay(item);
                            return (
                                <tr
                                    key={displayData.id}
                                    className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} border-b-1 border-green-200`}
                                >
                                    <td className="py-2 color-table-common">{idx + 1}</td>
                                    <td>{displayData.match}</td>
                                    <td>{displayData.mode}</td>
                                    <td>{displayData.winner}</td>
                                    <td>{displayData.date}</td>
                                    <td>{displayData.time}</td>
                                    <td>
                                        <FaInfoCircle
                                            className="text-orange-400 mx-auto cursor-pointer text-2xl hover:text-orange-600 transform hover:scale-125 transition-transform"
                                            onClick={() => handleOpenModal(item)}
                                        />                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            {/* Render Modal */}
            <MatchDetailModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                match={selectedMatch}
            />
        </div>
    );
}