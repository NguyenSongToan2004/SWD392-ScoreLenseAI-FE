import { useEffect, useState, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import type { Customer } from '../../../../models/DataObject';
import { getNavigationState, navigateWithState } from '../../../../Utils/navigationUtils';
import { fetchCustomersAPI, updateCustomerStatusAPI, deleteCustomerAPI } from '../../services/FetchAPI';

const CustomerManagement = () => {
    const [customerList, setCustomerList] = useState<Customer[]>([]);
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
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [isLoad, setIsLoad] = useState(false);

    const nav = useNavigate();
    const loc = useLocation();
    const navigationState = getNavigationState(loc, 'userInfo') || {};

    const fetchCustomers = useCallback(async () => {
        try {
            setLoading(true);

            const response = await fetchCustomersAPI({
                page: pagination.page,
                size: pagination.size,
                sortBy: pagination.sortBy,
                sortDirection: pagination.sortDirection,
                search: searchTerm.trim() || undefined,
                status: statusFilter || undefined
            });

            if (response.status === 200 || response.status === 1000) {
                if (response.data && typeof response.data === 'object' && 'content' in response.data) {
                    const data = response.data as any;
                    setCustomerList(data.content || []);
                    setPagination(prev => ({
                        ...prev,
                        totalElements: data.totalElements || 0,
                        totalPages: data.totalPages || 0,
                        last: data.last || false,
                        first: data.first || true,
                        empty: data.empty || false
                    }));
                } else if (Array.isArray(response.data)) {
                    setCustomerList(response.data);
                    setPagination(prev => ({
                        ...prev,
                        totalElements: response.data.length,
                        totalPages: Math.ceil(response.data.length / pagination.size),
                        last: pagination.page >= Math.ceil(response.data.length / pagination.size) - 1,
                        first: pagination.page === 0,
                        empty: response.data.length === 0
                    }));
                } else {
                    setCustomerList([]);
                    toast.error('Invalid response format');
                }
            } else {
                toast.error(response.message || 'Failed to fetch customer data.');
                setCustomerList([]);
            }
        } catch (error) {
            setCustomerList([]);
            toast.error('Error fetching customer data');
        } finally {
            setLoading(false);
        }
    }, [pagination.page, pagination.size, pagination.sortBy, pagination.sortDirection, searchTerm, statusFilter, isLoad]);

    useEffect(() => {
        fetchCustomers();
    }, [fetchCustomers]);

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

    const handleAction = useCallback(async (actionType: 'detail' | 'toggle-status' | 'delete', customer: Customer) => {
        switch (actionType) {
            case 'detail':
                navigateWithState(nav, `/admin/customer-management/detail/${customer.customerId}`, {
                    customer,
                    ...navigationState
                });
                break;
            case 'toggle-status':
                const newStatus = customer.status === 'active' ? 'inactive' : 'active';
                if (window.confirm(`Are you sure you want to ${newStatus === 'active' ? 'activate' : 'deactivate'} customer ${customer.name || customer.email}?`)) {
                    try {
                        const response = await updateCustomerStatusAPI(customer.customerId, newStatus);
                        if (response.status === 200 || response.status === 1000) {
                            toast.success(`Customer ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully`);
                            setIsLoad(!isLoad);
                        } else {
                            toast.error(response.message || 'Failed to update customer status');
                        }
                    } catch (error) {
                        toast.error('Error updating customer status');
                    }
                }
                break;
            case 'delete':
                if (window.confirm(`Are you sure you want to delete customer ${customer.name || customer.email}?`)) {
                    try {
                        const response = await deleteCustomerAPI(customer.customerId);
                        if (response.status === 200 || response.status === 1000) {
                            toast.success('Customer deleted successfully');
                            setIsLoad(!isLoad);
                        } else {
                            toast.error(response.message || 'Failed to delete customer');
                        }
                    } catch (error) {
                        toast.error('Error deleting customer');
                    }
                }
                break;
        }
    }, [nav, navigationState, isLoad]);

    const getSortIcon = (column: string) => {
        if (pagination.sortBy !== column) return '↕️';
        return pagination.sortDirection === 'asc' ? '↑' : '↓';
    };

    const paginationInfo = useMemo(() => ({
        showingFrom: (pagination.page - 1) * pagination.size + 1,
        showingTo: Math.min(pagination.page * pagination.size, pagination.totalElements),
        total: pagination.totalElements
    }), [pagination.page, pagination.size, pagination.totalElements]);

    return (
        <div className="p-4 sm:p-6 md:p-8 flex flex-col max-h-full bg-white rounded-2xl">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Customer Management</h2>
            </div>

            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
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
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mb-4">
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

            <div className="flex-1 flex flex-col shadow-md rounded-lg overflow-hidden">
                {loading ? (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                            <p className="mt-2 text-gray-600">Loading customer data...</p>
                        </div>
                    </div>
                ) : customerList.length > 0 ? (
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
                                {customerList.map((customer) => (
                                    <tr key={customer.customerId} className="bg-white border-b hover:bg-gray-50 text-base">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {customer.customerId.slice(0, 8)}...
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                {customer.imageURL ? (
                                                    <img
                                                        src={customer.imageURL}
                                                        alt={customer.name || 'Customer'}
                                                        className="w-10 h-10 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                                                        <span className="text-gray-600 font-medium">
                                                            {customer.name?.charAt(0)?.toUpperCase() || customer.email?.charAt(0)?.toUpperCase()}
                                                        </span>
                                                    </div>
                                                )}
                                                <span className="font-medium">{customer.name || 'N/A'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">{customer.email}</td>
                                        <td className="px-6 py-4">{customer.phoneNumber || 'N/A'}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 text-sm rounded-full ${
                                                customer.status === 'active' 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {customer.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">{customer.createAt}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-x-2">
                                                <button
                                                    title="Detail"
                                                    className="text-gray-500 hover:text-gray-800 focus:outline-none cursor-pointer p-1"
                                                    onClick={() => handleAction("detail", customer)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639l4.418-5.58a1.012 1.012 0 0 1 .59-.283h8.91a1.012 1.012 0 0 1 .59.283l4.418 5.58a1.012 1.012 0 0 1 0 .639l-4.418 5.58a1.012 1.012 0 0 1-.59.283h-8.91a1.012 1.012 0 0 1-.59-.283L2.036 12.322Z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    title={customer.status === 'active' ? 'Deactivate' : 'Activate'}
                                                    className={`focus:outline-none cursor-pointer p-1 ${
                                                        customer.status === 'active'
                                                            ? 'text-green-500 hover:text-green-800'
                                                            : 'text-yellow-500 hover:text-yellow-800'
                                                    }`}
                                                    onClick={() => handleAction("toggle-status", customer)}
                                                >
                                                    {customer.status === 'active' ? (
                                                        // Unlocked icon for active
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                                        </svg>
                                                    ) : (
                                                        // Locked icon for inactive
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                                        </svg>
                                                    )}
                                                </button>
                                                <button
                                                    title="Delete"
                                                    className="text-red-500 hover:text-red-800 focus:outline-none cursor-pointer p-1"
                                                    onClick={() => handleAction("delete", customer)}
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
                        <p className="text-lg text-gray-500">No customers found</p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-4">
                    <button
                        onClick={() => handlePageChange(pagination.page - 1)}
                        disabled={pagination.first}
                        className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    
                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-1 border rounded ${
                                pagination.page === page
                                    ? 'bg-blue-500 text-white'
                                    : 'hover:bg-gray-100'
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                    
                    <button
                        onClick={() => handlePageChange(pagination.page + 1)}
                        disabled={pagination.last}
                        className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default CustomerManagement;

