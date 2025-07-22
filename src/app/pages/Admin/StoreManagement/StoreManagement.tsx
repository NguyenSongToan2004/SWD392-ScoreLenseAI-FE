import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchStoreAPI, updateStoreStatusAPI } from '../services/FetchAPI';
import type { Store } from '../models/RequestObject';

const StoreManagement = () => {
    const navigate = useNavigate();
    const [stores, setStores] = useState<Store[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStores();
    }, []);

    const loadStores = async () => {
        try {
            setLoading(true);
            const response = await fetchStoreAPI();
            if (response.status === 1000) {
                setStores(response.data);
            }
        } catch (error) {
            console.error('Error loading stores:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleViewStore = (storeId: string) => {
        navigate(`/admin/store-management/detail/${storeId}`);
    };

    const handleEditStore = (storeId: string) => {
        navigate(`/admin/store-management/edit/${storeId}`);
    };

    const handleCreateStore = () => {
        navigate('/admin/store-management/create');
    };

    const handleUpdateStoreStatus = async (storeId: string, newStatus: 'activate' | 'closed') => {
        try {
            const response = await updateStoreStatusAPI(storeId, newStatus);
            if (response.status === 1000) {
                await loadStores();
                alert(`Store status updated to ${newStatus} successfully!`);
            }
        } catch (error) {
            console.error('Error updating store status:', error);
            alert('Failed to update store status');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg">Loading stores...</div>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6 md:p-8 flex flex-col max-h-full bg-white rounded-2xl">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800 inline-block mr-10">Store Management</h1>
                <button
                    onClick={handleCreateStore}
                    className="border rounded-xl px-2 py-2 border-green-500 text-green-800 cursor-pointer hover:bg-green-800 hover:text-white mb-2"
                >
                    <strong className="text-2xl">+</strong> Create Store
                </button>
            </div>

            <div className="flex-1 flex flex-col shadow-md rounded-lg overflow-hidden">
                <div className="flex-1 overflow-auto">
                    <table className="w-full text-base text-left text-gray-700">
                        <thead className="text-lg text-gray-800 uppercase bg-gray-100 sticky top-0">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Store Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Address
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tables
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {stores.map((store) => (
                                <tr key={store.storeID} className="bg-white border-b hover:bg-gray-50 text-base">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-base font-medium text-gray-900">{store.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-base text-gray-900">{store.address}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 text-sm rounded-full ${
                                            store.status === 'activate' 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {store.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-base text-gray-900">
                                        {store.billiardTables.length} tables
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-base font-medium">
                                        <div className="flex items-center gap-x-2">
                                            <button
                                                title="View Details"
                                                className="text-gray-500 hover:text-gray-800 focus:outline-none cursor-pointer p-1"
                                                onClick={() => handleViewStore(store.storeID)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639l4.418-5.58a1.012 1.012 0 0 1 .59-.283h8.91a1.012 1.012 0 0 1 .59.283l4.418 5.58a1.012 1.012 0 0 1 0 .639l-4.418 5.58a1.012 1.012 0 0 1-.59.283h-8.91a1.012 1.012 0 0 1-.59-.283L2.036 12.322Z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                </svg>
                                            </button>
                                            <button
                                                title="Edit Store"
                                                className="text-blue-500 hover:text-blue-800 focus:outline-none cursor-pointer p-1"
                                                onClick={() => handleEditStore(store.storeID)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                </svg>
                                            </button>
                                            <button
                                                title={store.status === 'activate' ? 'Close Store' : 'Activate Store'}
                                                className={`focus:outline-none cursor-pointer p-1 ${
                                                    store.status === 'activate'
                                                        ? 'text-green-500 hover:text-green-800'
                                                        : 'text-yellow-500 hover:text-yellow-800'
                                                }`}
                                                onClick={() => handleUpdateStoreStatus(
                                                    store.storeID, 
                                                    store.status === 'activate' ? 'closed' : 'activate'
                                                )}
                                            >
                                                {store.status === 'activate' ? (
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
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StoreManagement;
