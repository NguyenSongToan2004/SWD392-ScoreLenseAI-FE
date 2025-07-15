import { useEffect, useState } from "react";
import type { BilliardTable } from "../../Home/models/DataObject";
import { toast } from "sonner";
import { fetchTablesAPI } from "../services/FetchAPI";
import type { User } from "../../../models/DataObject";
import { useLocation, useNavigate } from "react-router-dom";



const TableManagement = () => {
    const [tables, setTables] = useState<BilliardTable[]>([]);
    const loc = useLocation();
    const nav = useNavigate();

    useEffect(() => {
        const fetchTables = async () => {
            try {
                let store: User | undefined = loc.state?.userInfo as User | undefined;
                const storeId = store?.store?.storeID;

                if (!storeId) {
                    toast.error("Store ID not found. Cannot fetch tables.");
                    return;
                }

                const response = await fetchTablesAPI(storeId);

                if (response.status === 200 && Array.isArray(response.data)) {
                    toast.info('Fetched table data successfully!');
                    const sortedData = response.data.sort((a, b) => {
                        const codeA = parseInt(a.tableCode, 10) || 0;
                        const codeB = parseInt(b.tableCode, 10) || 0;
                        return codeA - codeB;
                    });
                    setTables(sortedData);
                } else {
                    toast.error(response.message || 'Failed to fetch table data.');
                    setTables([]);
                }
            } catch (error) {
                toast.error('An error occurred while fetching tables.');
                console.error(error);
                setTables([]);
            }
        };

        fetchTables();
    }, [loc.state?.userInfo]);

    const handleAction = (actionType: 'detail' | 'edit' | 'delete', table: BilliardTable) => {
        let store: User | undefined = loc.state?.userInfo as User | undefined;
        switch (actionType) {
            case 'detail':
                nav(`/admin/table-management/detail/${table.billardTableID}`,
                    {
                        state: {
                            table,
                            store
                        }
                    });
                break;
            case 'edit':
                nav(`/admin/table-management/edit/${table.billardTableID}`, { state: { table, store } });
                break;
            case 'delete':
                if (window.confirm(`Are you sure you want to delete table ${table.name}?`)) {
                    console.log(`Deleting table with ID: ${table.billardTableID}`);
                    toast.success(`Table ${table.name} deleted successfully!`);
                    setTables(tables.filter(t => t.billardTableID !== table.billardTableID));
                }
                break;
            default:
                console.warn(`Unknown action type: ${actionType}`);
        }
    };

    return (
        <div className="p-4 sm:p-6 md:p-8">
            {/* Thay đổi ở đây: text-2xl -> text-3xl để tiêu đề lớn hơn */}
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Billiard Table Management</h2>
            <div className="overflow-x-auto shadow-md rounded-lg">
                {tables.length > 0 ? (
                    // Thay đổi ở đây: text-sm -> text-base để nội dung bảng lớn hơn
                    <table className="w-full text-base text-left text-gray-700">
                        {/* Thay đổi ở đây: text-xs -> text-sm để tiêu đề cột lớn hơn */}
                        <thead className="text-2xl text-gray-800 uppercase bg-gray-100">
                            <tr>
                                <th scope="col" className="px-6 py-3">Table Code</th>
                                <th scope="col" className="px-6 py-3">Table Name</th>
                                <th scope="col" className="px-6 py-3">Table Type</th>
                                <th scope="col" className="px-6 py-3">Description</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Active</th>
                                <th scope="col" className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tables.map((table) => (
                                <tr key={table.billardTableID} className="bg-white border-b hover:bg-gray-5 text-xl">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{table.tableCode}</td>
                                    <td className="px-6 py-4">{table.name}</td>
                                    <td className="px-6 py-4">{table.tableType}</td>
                                    <td className="px-6 py-4 truncate max-w-sm"
                                        title={table.description}
                                    >
                                        {table.description}
                                    </td>
                                    <td className="px-6 py-4">{table.status}</td>
                                    <td className="px-6 py-4">
                                        {/* Thay đổi ở đây: text-xs -> text-sm để huy hiệu lớn hơn */}
                                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${table.active
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                            }`}>
                                            {table.active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {/* Sử dụng flex để sắp xếp các icon trên một hàng */}
                                        <div className="flex items-center gap-x-4">

                                            {/* Nút Detail */}
                                            <button
                                                title="Detail"
                                                className="text-gray-500 hover:text-gray-800 focus:outline-none cursor-pointer"
                                                onClick={() => handleAction("detail", table)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639l4.418-5.58a1.012 1.012 0 0 1 .59-.283h8.91a1.012 1.012 0 0 1 .59.283l4.418 5.58a1.012 1.012 0 0 1 0 .639l-4.418 5.58a1.012 1.012 0 0 1-.59.283h-8.91a1.012 1.012 0 0 1-.59-.283L2.036 12.322Z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                </svg>
                                            </button>

                                            {/* Nút Edit */}
                                            <button
                                                title="Edit"
                                                className="text-gray-500 hover:text-blue-600 focus:outline-none cursor-pointer"
                                                onClick={() => handleAction("edit", table)}

                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                </svg>
                                            </button>

                                            {/* Nút Delete */}
                                            <button
                                                title="Delete"
                                                className="text-gray-500 hover:text-red-600 focus:outline-none cursor-pointer"
                                                onClick={() => handleAction("delete", table)}

                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    // Thay đổi ở đây: Thêm class text-lg để thông báo lớn hơn
                    <p className="text-center py-10 text-lg text-gray-500">No table data to display.</p>
                )}
            </div>
        </div>
    );
};

export default TableManagement; 