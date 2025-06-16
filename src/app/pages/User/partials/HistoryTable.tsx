import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";

const mockData = [
    {
        id: 1,
        match: "Team A vs Team B",
        mode: "3-Cushion",
        winner: "Team A",
        date: "01-05-2025",
        time: "18:05",
    },
    {
        id: 2,
        match: "Team Aasd vs Team asd",
        mode: "3-Cushion",
        winner: "Team A",
        date: "01-05-2025",
        time: "18:05",
    }, {
        id: 2,
        match: "Team Aasd vs Team asd",
        mode: "3-Cushion",
        winner: "Team A",
        date: "01-05-2025",
        time: "18:05",
    },
    {
        id: 2,
        match: "Team Aasd vs Team asd",
        mode: "3-Cushion",
        winner: "Team A",
        date: "01-05-2025",
        time: "18:05",
    }, {
        id: 2,
        match: "Team Aasd vs Team asd",
        mode: "3-Cushion",
        winner: "Team A",
        date: "01-05-2025",
        time: "18:05",
    },
    {
        id: 2,
        match: "Team Aasd vs Team asd",
        mode: "3-Cushion",
        winner: "Team A",
        date: "01-05-2025",
        time: "18:05",
    }, {
        id: 2,
        match: "Team Aasd vs Team asd",
        mode: "3-Cushion",
        winner: "Team A",
        date: "01-05-2025",
        time: "18:05",
    },
    {
        id: 2,
        match: "Team Aasd vs Team asd",
        mode: "3-Cushion",
        winner: "Team A",
        date: "01-05-2025",
        time: "18:05",
    }, {
        id: 2,
        match: "Team Aasd vs Team asd",
        mode: "3-Cushion",
        winner: "Team A",
        date: "01-05-2025",
        time: "18:05",
    },
    {
        id: 2,
        match: "Team Aasd vs Team asd",
        mode: "3-Cushion",
        winner: "Team A",
        date: "01-05-2025",
        time: "18:05",
    }, {
        id: 2,
        match: "Team Aasd vs Team asd",
        mode: "3-Cushion",
        winner: "Team A",
        date: "01-05-2025",
        time: "18:05",
    },
    {
        id: 2,
        match: "Team Aasd vs Team asd",
        mode: "3-Cushion",
        winner: "Team A",
        date: "01-05-2025",
        time: "18:05",
    }, {
        id: 2,
        match: "Team Aasd vs Team asd",
        mode: "3-Cushion",
        winner: "Team A",
        date: "01-05-2025",
        time: "18:05",
    }
    // Thêm dữ liệu tương tự...
];

export default function HistoryTable() {
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    return (
        <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-200 h-full flex flex-col">
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
                        className="border-2 border-gray-400 hover:border-green-700 rounded px-3 py-1 text-2xl"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                    />
                    <span className="text-gray-500 text-xl">→</span>
                    <input
                        type="date"
                        className="border-2 border-gray-400 hover:border-green-700 rounded px-3 py-1 text-2xl"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                    />

                    <button
                        className="flex items-center gap-2 bg-green-600
                     text-white px-4 py-2 rounded
                      hover:bg-green-700 transition cursor-pointer"
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
                        {mockData.map((item, idx) => (
                            <tr
                                key={item.id}
                                className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                                 border-b-1 border-green-200`}
                            >
                                <td className="py-2 color-table-common">{idx + 1}</td>
                                <td>{item.match}</td>
                                <td>{item.mode}</td>
                                <td>{item.winner}</td>
                                <td>{item.date}</td>
                                <td>{item.time}</td>
                                <td>
                                    <FaInfoCircle className="text-orange-400 mx-auto cursor-pointer" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
