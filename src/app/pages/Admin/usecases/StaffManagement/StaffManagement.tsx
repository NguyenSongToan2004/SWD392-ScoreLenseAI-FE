import { useEffect, useState, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import type { Staff, User } from '../../../../models/DataObject';
import { getNavigationState, navigateWithState } from '../../../../Utils/navigationUtils';
import type { ListStaffResponse } from '../../models/ResponseObject';
import { fetchStaffsAPI } from '../../services/FetchAPI';

const StaffManagement = () => {
    const [staffList, setStaffList] = useState<User[]>([]);
    const [pagination, setPagination] = useState({
        page: 1,
        size: 5,
        totalElements: 0,
        totalPages: 0,
        last: false,
        first: true,
        empty: false,
        sortBy: 'createAt',
        sortDirection: 'desc'
    });
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<string>('');
    const [isLoad, setIsLoad] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const loc = useLocation();
    const nav = useNavigate();

    // Memoize navigation state
    const navigationState = useMemo(() => ({
        userInfo: getNavigationState(loc, 'userInfo') as User,
        store: getNavigationState(loc, 'store')
    }), [loc]);

    // Debounce search term
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 1000);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Memoize fetch function
    const fetchStaffs = useCallback(async () => {
        try {
            setLoading(true);
            const storeId = navigationState.userInfo?.store?.storeID || localStorage.getItem("storeID");

            const response = await fetchStaffsAPI({
                page: pagination.page,
                size: pagination.size,
                sortBy: pagination.sortBy,
                sortDirection: pagination.sortDirection,
                search: debouncedSearchTerm.trim() || undefined,
                status: statusFilter || undefined,
                storeId: storeId || undefined
            });

            if (response.status === 200) {
                if (response.data && typeof response.data === 'object' && 'content' in response.data) {
                    const listResponse = response.data as ListStaffResponse;
                    setStaffList(listResponse.content || []);
                    setPagination(prev => ({
                        ...prev,
                        totalElements: listResponse.totalElements || 0,
                        totalPages: listResponse.totalPages || 0,
                        last: listResponse.last || false,
                        first: listResponse.first || true,
                        empty: listResponse.empty || false
                    }));
                } else if (Array.isArray(response.data)) {
                    setStaffList(response.data);
                    setPagination(prev => ({
                        ...prev,
                        totalElements: response.data.length,
                        totalPages: Math.ceil(response.data.length / pagination.size),
                        last: pagination.page >= Math.ceil(response.data.length / pagination.size) - 1,
                        first: pagination.page === 0,
                        empty: response.data.length === 0
                    }));
                } else {
                    setStaffList([]);
                    toast.error('Invalid response format');
                }
            } else {
                toast.error(response.message || 'Failed to fetch staff data.');
                setStaffList([]);
            }
        } catch (error) {
            setStaffList([]);
            toast.error('Error fetching staff data');
        } finally {
            setLoading(false);
        }
    }, [pagination.page, pagination.size, pagination.sortBy, pagination.sortDirection, debouncedSearchTerm, statusFilter, isLoad, navigationState.userInfo]);

    useEffect(() => {
        fetchStaffs();
    }, [fetchStaffs]);

    // Memoize handlers
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

    const handleSortChange = useCallback((sortBy: string) => {
        const newDirection = pagination.sortBy === sortBy && pagination.sortDirection === 'asc' ? 'desc' : 'asc';
        setPagination(prev => ({
            ...prev,
            sortBy,
            sortDirection: newDirection,
            page: 1
        }));
    }, [pagination.sortBy, pagination.sortDirection]);

    const handleCreate = useCallback(() => {
        navigateWithState(nav, `/admin/staff-management/create`, navigationState);
    }, [nav, navigationState]);

    const handleAction = useCallback((actionType: 'detail' | 'edit' | 'delete', staff: Staff) => {
        switch (actionType) {
            case 'detail':
                navigateWithState(nav, `/admin/staff-management/detail/${staff.staffID}`, {
                    staff,
                    ...navigationState
                });
                break;
            case 'edit':
                navigateWithState(nav, `/admin/staff-management/edit/${staff.staffID}`, {
                    staff,
                    ...navigationState
                });
                break;
            case 'delete':
                if (window.confirm(`Are you sure you want to delete staff ${staff.name}?`)) {
                    toast.success('Staff deleted successfully');
                    setIsLoad(!isLoad);
                }
                break;
        }
    }, [nav, navigationState, isLoad]);

    // Memoize utility functions
    const getStatusBadge = useCallback((status: string) => {
        const statusColors = {
            'ACTIVE': 'bg-green-100 text-green-800',
            'INACTIVE': 'bg-red-100 text-red-800',
            'PENDING': 'bg-yellow-100 text-yellow-800'
        };
        return statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800';
    }, []);

    const formatDate = useCallback((dateString: string) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('vi-VN');
    }, []);

    const getSortIcon = useCallback((column: string) => {
        if (pagination.sortBy !== column) {
            return (
                <svg className="w-4 h-4 ml-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
            );
        }
        return pagination.sortDirection === 'asc' ? (
            <svg className="w-4 h-4 ml-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
        ) : (
            <svg className="w-4 h-4 ml-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        );
    }, [pagination.sortBy, pagination.sortDirection]);

    // Memoize pagination info
    const paginationInfo = useMemo(() => ({
        showingFrom: (pagination.page - 1) * pagination.size + 1,
        showingTo: Math.min(pagination.page * pagination.size, pagination.totalElements),
        total: pagination.totalElements
    }), [pagination.page, pagination.size, pagination.totalElements]);

    return (
        <div className="p-4 sm:p-6 md:p-8 flex flex-col max-h-full bg-white rounded-2xl">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Staff Management</h2>
                <button
                    onClick={handleCreate}
                    className="border rounded-xl px-4 py-2 border-green-500 text-green-800 cursor-pointer hover:bg-green-800 hover:text-white transition-colors">
                    <strong className="text-xl">+</strong> Create Staff
                </button>
            </div>

            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6 h-full">
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Search by name, email, or phone..."
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <div className="flex gap-2">
                    <select
                        value={statusFilter}
                        onChange={(e) => handleStatusFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="">All Status</option>
                        <option value="ACTIVE">Active</option>
                        <option value="INACTIVE">Inactive</option>
                        <option value="PENDING">Pending</option>
                    </select>
                    {(searchTerm || statusFilter) && (
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setStatusFilter('');
                            }}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            Clear
                        </button>
                    )}
                </div>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mb-4 h-full">
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">
                        Showing {paginationInfo.showingFrom} to {paginationInfo.showingTo} of {paginationInfo.total} entries
                        {searchTerm && <span className="text-blue-600"> (filtered by "{searchTerm}")</span>}
                        {statusFilter && <span className="text-blue-600"> (status: {statusFilter})</span>}
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

            <div className="flex-1 flex flex-col shadow-md rounded-lg h-full">
                {loading ? (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                            <p className="mt-2 text-gray-600">Loading staff data...</p>
                        </div>
                    </div>
                ) : staffList.length > 0 ? (
                    <div className="flex-1 overflow-auto">
                        <table className="w-full text-base text-left text-gray-700">
                            <thead className="text-lg text-gray-800 uppercase bg-gray-100 sticky top-0">
                                <tr>
                                    <th scope="col" className="px-6 py-3">ID</th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 cursor-pointer hover:bg-gray-200 select-none"
                                        onClick={() => handleSortChange('name')}
                                    >
                                        <div className="flex items-center">
                                            Name
                                            {getSortIcon('name')}
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 cursor-pointer hover:bg-gray-200 select-none"
                                        onClick={() => handleSortChange('email')}
                                    >
                                        <div className="flex items-center">
                                            Email
                                            {getSortIcon('email')}
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3">Phone</th>
                                    <th scope="col" className="px-6 py-3">Roles</th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 cursor-pointer hover:bg-gray-200 select-none"
                                        onClick={() => handleSortChange('status')}
                                    >
                                        <div className="flex items-center">
                                            Status
                                            {getSortIcon('status')}
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 cursor-pointer hover:bg-gray-200 select-none"
                                        onClick={() => handleSortChange('createAt')}
                                    >
                                        <div className="flex items-center">
                                            Created
                                            {getSortIcon('createAt')}
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {staffList.map((staff) => (
                                    <tr key={staff.staffID} className="bg-white border-b hover:bg-gray-50 text-base">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {staff.staffID}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                {staff.imageUrl ? (
                                                    <img
                                                        src={staff.imageUrl}
                                                        alt={staff.name}
                                                        className="w-10 h-10 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                                                        <span className="text-gray-600 font-medium">
                                                            {staff.name?.charAt(0)?.toUpperCase()}
                                                        </span>
                                                    </div>
                                                )}
                                                <span>{staff.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">{staff.email}</td>
                                        <td className="px-6 py-4">{staff.phoneNumber || 'N/A'}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1">
                                                <span
                                                    className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                                                >
                                                    {staff.role == null ? 'N/A' : staff.role}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(staff.status)}`}>
                                                {staff.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">{formatDate(staff.createAt)}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-x-2">
                                                <button
                                                    title="Detail"
                                                    className="text-gray-500 hover:text-gray-800 focus:outline-none cursor-pointer p-1"
                                                    onClick={() => handleAction("detail", staff)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639l4.418-5.58a1.012 1.012 0 0 1 .59-.283h8.91a1.012 1.012 0 0 1 .59.283l4.418 5.58a1.012 1.012 0 0 1 0 .639l-4.418 5.58a1.012 1.012 0 0 1-.59.283h-8.91a1.012 1.012 0 0 1-.59-.283L2.036 12.322Z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    title="Edit"
                                                    className="text-blue-500 hover:text-blue-800 focus:outline-none cursor-pointer p-1"
                                                    onClick={() => handleAction("edit", staff)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                    </svg>
                                                </button>
                                                <button
                                                    title="Delete"
                                                    className="text-red-500 hover:text-red-800 focus:outline-none cursor-pointer p-1"
                                                    onClick={() => handleAction("delete", staff)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="flex-1 flex items-center justify-center">
                        <p className="text-lg text-gray-500">No staff data to display.</p>
                    </div>
                )}
            </div>

            {/* Pagination - Fixed at bottom */}
            {!loading && pagination.totalPages > 1 && (
                <div className="flex justify-between items-center mt-6 pt-4 border-t h-full">
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
                                    className={`px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 ${pageNum === pagination.page ? 'bg-blue-500 text-white' : ''
                                        }`}
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
    )
}

export default StaffManagement
