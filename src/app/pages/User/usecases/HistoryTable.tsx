import { useEffect, useState } from "react";
import { FaFilter, FaInfoCircle } from "react-icons/fa";
import { toast } from "sonner";
import { ModeDisplayMap } from "../models/enum";

// Import các component, type và service cần thiết (đảm bảo đường dẫn chính xác)
import type { BilliardMatch } from "../../../models/DataObject";
import { isOpacityStore } from "../homeStore";
import MatchDetailModal from "../partials/MatchDetailModal";
import { fetchHistoryMatchAPI } from "../services/FetchAPI";

export default function HistoryTable() {
    // State để quản lý bộ lọc ngày
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    // State để quản lý modal chi tiết trận đấu
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMatch, setSelectedMatch] = useState<BilliardMatch | null>(null);
    // State để lưu danh sách lịch sử các trận đấu
    const [historyMatchs, setHistoryMatchs] = useState<BilliardMatch[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Hàm để mở modal và làm mờ nền
    const handleOpenModal = (match: BilliardMatch) => {
        setSelectedMatch(match);
        setIsModalOpen(true);
        isOpacityStore.set((prev) => {
            prev.value = true;
        });
    };

    // Hàm để đóng modal và bỏ làm mờ nền
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedMatch(null);
        isOpacityStore.set((prev) => {
            prev.value = false;
        });
    };

    useEffect(() => {
        const fetchHistoryMatch = async () => {
            setIsLoading(true);
            try {
                // TODO: Thay thế customerID tĩnh bằng ID của người dùng đang đăng nhập
                const customerID = localStorage.getItem('userID');
                if (customerID) {
                    const response = await fetchHistoryMatchAPI(customerID);

                    if (response.status === 200) {
                        setHistoryMatchs(response.data);
                    } else {
                        toast.warning(response.message || "Không thể tải lịch sử trận đấu.");
                    }
                }
            } catch (error) {
                toast.error("Lỗi kết nối máy chủ.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchHistoryMatch();
    }, []);

    // Hàm helper để định dạng dữ liệu trận đấu cho việc hiển thị
    const formatMatchForDisplay = (match: BilliardMatch) => ({
        id: match.billiardMatchID,
        match: `${match.teams[0]?.name || 'N/A'} vs ${match.teams[1]?.name || 'N/A'}`,
        mode: match.modeID,
        winner: match.winner || "No winner yet",
        date: new Date(match.startTime).toLocaleDateString('vi-VN'),
        time: match.endTime
            ? new Date(new Date(match.endTime).getTime() - new Date(match.startTime).getTime()).toISOString().substr(11, 8)
            : "In progress",
    });
    const modeForDisplay = (modeID: number): string => {
        return ModeDisplayMap[modeID] || "Unknown Mode";
    };
    const filteredData = historyMatchs;

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full bg-white p-6 rounded-lg shadow-xl">
                <p className="text-2xl text-gray-500 font-sans">Đang tải lịch sử trận đấu...</p>
            </div>
        );
    }

    if (!isLoading && historyMatchs.length === 0) {
        return (
            <div className="flex justify-center items-center h-full bg-white p-6 rounded-lg shadow-xl">
                <p className="text-2xl text-gray-500 font-sans">Chưa có lịch sử trận đấu nào.</p>
            </div>
        )
    }

    return (
        <div className="bg-white p-3 md:p-6 rounded-lg shadow-xl border border-gray-200 h-full flex flex-col z-10">
            {/* Header: Tiêu đề và bộ lọc */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <h1
                    className="text-4xl md:text-6xl font-medium mb-4 md:mb-0 text-center md:text-left"
                    style={{ color: `var(--secondary-color)` }}
                >
                    HISTORY
                </h1>
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                    <input
                        type="date"
                        className="border-2 border-gray-400 hover:border-green-700 rounded px-3 py-2 text-base w-full sm:w-auto font-sans"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                    />
                    <span className="text-gray-500 text-xl hidden sm:block">→</span>
                    <input
                        type="date"
                        className="border-2 border-gray-400 hover:border-green-700 rounded px-3 py-2 text-base w-full sm:w-auto font-sans"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                    />
                    <button
                        className="flex items-center justify-center gap-2 text-white px-4 py-2 rounded hover:bg-green-700 transition cursor-pointer w-full sm:w-auto"
                        style={{ backgroundColor: `var(--primary-color)` }}
                    >
                        <FaFilter /> FILTER
                    </button>
                </div>
            </div>

            {/* --- Giao diện Bảng cho Desktop --- */}
            <div className="flex-1 overflow-x-auto overflow-y-auto rounded-2xl hidden md:block">
                <table className="w-full text-center">
                    <thead className="sticky top-0 z-10 color-table-common color-text-common">
                        <tr className="text-xl lg:text-2xl h-min-[30px]">
                            <th className="p-2">#</th>
                            <th className="p-2">MATCH OF</th>
                            <th>MODE</th>
                            <th>WINNER</th>
                            <th>DATE</th>
                            <th>DURATION</th>
                            <th>DETAIL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item, idx) => {
                            const displayData = formatMatchForDisplay(item);
                            return (
                                /* ================================================================== */
                                /* ↓↓↓ THAY ĐỔI CHÍNH NẰM Ở ĐÂY ↓↓↓                      */
                                /* ================================================================== */
                                <tr
                                    key={displayData.id}
                                    className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                                     border-b border-green-200 text-sm lg:text-xl`}
                                >
                                    <td className="py-3 px-2 color-table-common">{idx + 1}</td>
                                    <td >{displayData.match}</td>
                                    <td>{modeForDisplay(displayData.mode)}</td>
                                    <td>{displayData.winner}</td>
                                    <td>{displayData.date}</td>
                                    <td>{displayData.time}</td>
                                    <td>
                                        <FaInfoCircle
                                            className="text-orange-400 mx-auto cursor-pointer text-xl lg:text-2xl hover:text-orange-600 transform hover:scale-125 transition-transform"
                                            onClick={() => handleOpenModal(item)}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* --- Giao diện Thẻ (Card) cho Mobile --- */}
            <div className="flex-1 overflow-y-auto rounded-lg space-y-3 block md:hidden">
                {filteredData.map((item) => {
                    const displayData = formatMatchForDisplay(item);
                    return (
                        <div key={displayData.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200 font-sans">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm text-gray-500">MATCH</p>
                                    <p className="font-bold text-lg color-text-common uppercase">{displayData.match}</p>
                                </div>
                                <button onClick={() => handleOpenModal(item)} className="p-1">
                                    <FaInfoCircle className="text-orange-400 cursor-pointer text-2xl flex-shrink-0 ml-2" />
                                </button>
                            </div>
                            <div className="mt-3 pt-3 border-t border-gray-200 text-sm space-y-1 uppercase">
                                <p><span className="font-semibold">WINNER:</span> {displayData.winner}</p>
                                <p><span className="font-semibold">DATE:</span> {displayData.date}</p>
                                <p><span className="font-semibold">DURATION:</span> {displayData.time}</p>
                                <p><span className="font-semibold">MODE:</span> {displayData.mode}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Modal chi tiết trận đấu */}
            <MatchDetailModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                match={selectedMatch}
            />
        </div>
    );
}
