import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getNavigationState } from "../../../../Utils/navigationUtils";
import type { Store } from "../../models/ResponseObject";
import { fetchStoreAPI, updateStoreStatusAPI } from "../../services/FetchAPI";

const StoreManagement = () => {
    const [storeList, setStoreList] = useState<Store[]>([]);
    const [filteredStores, setFilteredStores] = useState<Store[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [isLoad, setIsLoad] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [pagination, setPagination] = useState({
        page: 1,
        size: 10,
        totalElements: 0,
        totalPages: 0,
        last: false,
        first: true,
        empty: false
    });
    const loc = useLocation();
    const nav = useNavigate();

    useEffect(() => {
        const fetchStores = async () => {
            try {
                setLoading(true);
                const response = await fetchStoreAPI();
                if (response.status === 200 && Array.isArray(response.data)) {
                    setStoreList(response.data);
                } else {
                    toast.error(response.message || 'Failed to fetch store data.');
                    setStoreList([]);
                }
            } catch (error) {
                setStoreList([]);
                toast.error('Error fetching stores');
            } finally {
                setLoading(false);
            }
        }
        fetchStores();
    }, [isLoad]);

    // Filter and paginate stores
    useEffect(() => {
        let filtered = storeList;

        if (searchTerm.trim() !== '') {
            filtered = filtered.filter(store =>
                store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                store.address.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (statusFilter !== 'all') {
            filtered = filtered.filter(store => store.status === statusFilter);
        }

        // Update pagination info
        const totalElements = filtered.length;
        const totalPages = Math.ceil(totalElements / pagination.size);
        const startIndex = (pagination.page - 1) * pagination.size;
        const endIndex = startIndex + pagination.size;
        const paginatedData = filtered.slice(startIndex, endIndex);

        setFilteredStores(paginatedData);
        setPagination(prev => ({
            ...prev,
            totalElements,
            totalPages,
            last: pagination.page >= totalPages,
            first: pagination.page === 1,
            empty: totalElements === 0
        }));
    }, [searchTerm, statusFilter, storeList, pagination.page, pagination.size]);

    const handleSearch = useCallback((value: string) => {
        setSearchTerm(value);
        setPagination(prev => ({ ...prev, page: 1 }));
    }, []);

    const handleStatusFilter = useCallback((status: string) => {
        setStatusFilter(status);
        setPagination(prev => ({ ...prev, page: 1 }));
    }, []);

    const handlePageChange = useCallback((newPage: number) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            setPagination(prev => ({ ...prev, page: newPage }));
        }
    }, [pagination.totalPages]);

    const handlePageSizeChange = useCallback((newSize: number) => {
        setPagination(prev => ({ ...prev, size: newSize, page: 1 }));
    }, []);

    const handleAction = (action: string, store: Store) => {
        // const state = getNavigationState(loc);
        switch (action) {
            case "detail":
                nav(`/admin/store/detail/${store.storeID}`, {
                    state: {
                        userInfo: getNavigationState(loc, 'userInfo'),
                        store: getNavigationState(loc, 'store')
                    }
                });
                break;
            case "edit":
                nav(`/admin/store/edit/${store.storeID}`, {
                    state: {
                        userInfo: getNavigationState(loc, 'userInfo'),
                        store: getNavigationState(loc, 'store')
                    }
                });
                break;
            case "toggleStatus":
                handleToggleStatus(store);
                break;
        }
    };

    const handleToggleStatus = async (store: Store) => {
        const newStatus = store.status === "activate" ? "closed" : "activate";
        try {
            const response = await updateStoreStatusAPI(store.storeID, newStatus);
            if (response.status === 200) {
                toast.success(`Store ${newStatus === "activate" ? "activated" : "closed"} successfully`);
                setIsLoad(!isLoad);
            } else {
                toast.error(response.message || 'Failed to update store status');
            }
        } catch (error) {
            toast.error('Error updating store status');
        }
    };

    const paginationInfo = useMemo(() => ({
        showingFrom: pagination.totalElements === 0 ? 0 : (pagination.page - 1) * pagination.size + 1,
        showingTo: Math.min(pagination.page * pagination.size, pagination.totalElements),
        total: pagination.totalElements
    }), [pagination.page, pagination.size, pagination.totalElements]);

    return (
        <div className="p-4 sm:p-6 md:p-8 flex flex-col h-full bg-white rounded-2xl">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Store Management</h2>
                <button
                    onClick={() => {
                        // const state = getNavigationState(loc);
                        nav('/admin/store/create', {
                            state: {
                                userInfo: getNavigationState(loc, 'userInfo'),
                                store: getNavigationState(loc, 'store')
                            }
                        });
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add Store
                </button>
            </div>

            {/* Search and Filter */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Search stores by name or address..."
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => handleStatusFilter(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="all">All Status</option>
                    <option value="activate">Active</option>
                    <option value="closed">Closed</option>
                </select>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">
                        Showing {paginationInfo.showingFrom} to {paginationInfo.showingTo} of {paginationInfo.total} entries
                        {(searchTerm || statusFilter !== 'all') && <span className="text-blue-600"> (filtered)</span>}
                    </span>
                    <select
                        value={pagination.size}
                        onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                    >
                        <option value={5}>5 per page</option>
                        <option value={10}>10 per page</option>
                        <option value={20}>20 per page</option>
                        <option value={50}>50 per page</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="flex-1 shadow-md rounded-lg overflow-hidden">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    </div>
                ) : filteredStores.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-base text-left text-gray-700">
                            <thead className="text-2xl text-gray-800 uppercase bg-gray-100">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Name</th>
                                    <th scope="col" className="px-6 py-3">Address</th>
                                    <th scope="col" className="px-6 py-3">Status</th>
                                    <th scope="col" className="px-6 py-3">Tables</th>
                                    <th scope="col" className="px-6 py-3">Description</th>
                                    <th scope="col" className="px-6 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStores.map((store) => (
                                    <tr key={store.storeID} className="bg-white border-b hover:bg-gray-50 text-xl">
                                        <td className="px-6 py-4 font-medium">{store.name}</td>
                                        <td className="px-6 py-4">{store.address}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${store.status === 'activate'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                                }`}>
                                                {store.status === 'activate' ? 'Active' : 'Closed'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">{store.billiardTables.length}</td>
                                        <td className="px-6 py-4 truncate max-w-xs" title={store.description}>
                                            {store.description}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-x-4">
                                                <button
                                                    title="Detail"
                                                    className="text-blue-500 hover:text-blue-800 focus:outline-none cursor-pointer"
                                                    onClick={() => handleAction("detail", store)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C5.412 7.346 8.846 4.5 12 4.5c3.154 0 6.588 2.846 9.964 7.178.075.097.133.202.133.322 0 .12-.058.225-.133.322C18.588 16.654 15.154 19.5 12 19.5c-3.154 0-6.588-2.846-9.964-7.178Z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    title="Edit"
                                                    className="text-yellow-500 hover:text-yellow-800 focus:outline-none cursor-pointer"
                                                    onClick={() => handleAction("edit", store)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                    </svg>
                                                </button>
                                                <button
                                                    title={store.status === 'activate' ? 'Close Store' : 'Activate Store'}
                                                    className={`focus:outline-none cursor-pointer ${store.status === 'activate'
                                                        ? 'text-red-500 hover:text-red-800'
                                                        : 'text-green-500 hover:text-green-800'
                                                        }`}
                                                    onClick={() => handleAction("toggleStatus", store)}
                                                >
                                                    {store.status === 'activate' ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
                                                        </svg>
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                        </svg>
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-400 mx-auto mb-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.001 3.001 0 0 1-.621-1.357A3.001 3.001 0 0 1 2.965 6.46c.329-.527.74-.994 1.211-1.385A3.001 3.001 0 0 1 6.75 4.5h10.5a3.001 3.001 0 0 1 2.574.575c.471.391.882.858 1.211 1.385.329.527.574 1.112.621 1.674a3.001 3.001 0 0 1-.621 1.357" />
                        </svg>
                        <p className="text-gray-500 text-lg">No stores found</p>
                        <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filters</p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {!loading && pagination.totalPages > 1 && (
                <div className="flex justify-between items-center mt-6 pt-4 border-t">
                    <div className="text-sm text-gray-600">
                        Page {pagination.page} of {pagination.totalPages}
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => handlePageChange(1)}
                            disabled={pagination.first}
                            className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                        >
                            First
                        </button>
                        <button
                            onClick={() => handlePageChange(pagination.page - 1)}
                            disabled={pagination.first}
                            className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                        >
                            Previous
                        </button>

                        {/* Page numbers */}
                        {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                            const pageNum = Math.max(1, Math.min(pagination.totalPages - 4, pagination.page - 2)) + i;
                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => handlePageChange(pageNum)}
                                    className={`px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 ${pageNum === pagination.page ? 'bg-blue-500 text-white' : ''}`}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}

                        <button
                            onClick={() => handlePageChange(pagination.page + 1)}
                            disabled={pagination.last}
                            className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                        >
                            Next
                        </button>
                        <button
                            onClick={() => handlePageChange(pagination.totalPages)}
                            disabled={pagination.last}
                            className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                        >
                            Last
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StoreManagement;