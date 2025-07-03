// src/pages/admin/TableDetails.tsx

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import type { BilliardTable, User } from '../../../models/DataObject'; // Giả sử interface này ở đúng đường dẫn
import { fetchTablesAPI } from '../services/FetchAPI'; // Giả sử service này ở đúng đường dẫn
import MatchDetailsPopup from '../partials/MatchDetailsPopup';
import { isOpacityStore } from '../../Admin/homeStore';
import "../home.css"
import { useLocation } from 'react-router-dom';

// Định nghĩa kiểu cho các trạng thái sẽ được dùng trong UI
type TableStatusUI = 'available' | 'occupied' | 'reserved';

// Định nghĩa style cho từng trạng thái để code gọn hơn
const statusStyles: Record<TableStatusUI, string> = {
    available: 'border-green text-green-600 bg-green-50 hover:bg-green-100',
    occupied: 'border-blue-800 text-blue-600 bg-blue-50 hover:bg-blue-100',
    reserved: 'border-red-500 text-red-600 bg-red-50 hover:bg-red-100',
};

/**
 * Hàm helper để ánh xạ trạng thái từ API sang trạng thái của UI.
 * API status: "inUse" | "available" | "underMaintainance"
 * UI status: 'available' | 'occupied' | 'reserved'
 */
const mapApiStatusToUI = (apiStatus: BilliardTable['status']): TableStatusUI => {
    switch (apiStatus) {
        case 'inUse':
            return 'occupied';
        case 'underMaintainance':
            return 'reserved';
        case 'available':
        default:
            return 'available';
    }
};

const TableDetails = () => {
    // Khởi tạo state là một mảng rỗng để tránh lỗi khi map
    const [tables, setTables] = useState<BilliardTable[]>([]);
    const [selectedTable, setSelectedTable] = useState<BilliardTable | null>(null);
    const isOpacity = isOpacityStore.use();
    const loc = useLocation();

    // === HÀM XỬ LÝ CLICK ĐƠN GIẢN HÓA CHO VIỆC TEST ===
    const handleTableClick = (table: BilliardTable) => {
        setSelectedTable(table);
        isOpacityStore.set((prev) => {
            prev.value = true;
        })
    };
    // ===============================================

    const handleOnClosePopUp = () => {
        setSelectedTable(null);
        isOpacityStore.set((prev) => {
            prev.value = false;
        })
    }

    useEffect(() => {
        const fetchTables = async () => {
            try {
                let store: User | undefined = loc.state?.userInfo as User | undefined
                const response = await fetchTablesAPI(store?.store?.storeID || "");
                if (response.status === 200 && Array.isArray(response.data)) {
                    toast.info('Fetched table data successfully!');

                    // Sắp xếp dữ liệu nhận về từ API tương tự như dữ liệu giả
                    const sortedData = response.data.sort((a, b) =>
                        parseInt(a.tableCode) - parseInt(b.tableCode)
                    );
                    setTables(sortedData);
                } else {
                    // Xử lý trường hợp API trả về lỗi hoặc data không phải mảng
                    toast.error(response.message || 'Failed to fetch table data.');
                    setTables([]); // Đảm bảo tables là một mảng
                }
            } catch (error) {
                toast.error('An error occurred while fetching tables.');
                console.error(error);
            }
        };

        fetchTables();
    }, []); // Mảng phụ thuộc rỗng để useEffect chỉ chạy một lần

    return (
        <div
        // className={`bg-white p-6 rounded-lg shadow-lg`}
        >
            {isOpacity && (
                <div className="absolute inset-0 bg-black opacity-30 z-50"></div>
            )}
            {/* Lưới các bàn */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {/* Thay vì map `tablesData`, giờ chúng ta map `tables` từ state */}
                {tables.map((table) => (
                    <div key={table.billardTableID}
                        className={`
                            border-3 rounded-lg px-2 py-2 cursor-pointer transition-all duration-200 transform hover:scale-105
                            ${statusStyles[mapApiStatusToUI(table.status)]} 
                        `}
                    >
                        <div
                            // Sử dụng `billardTableID` làm key vì nó là định danh duy nhất

                            onClick={() => handleTableClick(table)}
                            className={`
                            border-3 rounded-lg px-4 py-6 flex items-center justify-center 
                            cursor-pointer 
                            ${statusStyles[mapApiStatusToUI(table.status)]} 
                        `}
                        >
                            {/* Hiển thị `tableCode` thay vì `id` */}
                            <span className="text-3xl font-bold">{table.tableCode}</span>
                        </div>
                    </div>
                ))}
            </div>

            {
                selectedTable && (
                    <MatchDetailsPopup
                        table={selectedTable}
                        onClose={handleOnClosePopUp}
                        match={selectedTable.matchResponse || null}
                    />
                )
            }
        </div>
    );
};

export default TableDetails;
