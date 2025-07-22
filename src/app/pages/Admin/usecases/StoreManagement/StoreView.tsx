import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { getNavigationState, navigateWithState } from '../../../../Utils/navigationUtils';
import type { Store, StoreDetail } from '../../models/ResponseObject';
import { fetchStoreByIdAPI, fetchStoreDetailAPI } from '../../services/FetchAPI';

const StoreView = () => {
    const { id } = useParams<{ id: string }>();
    const [store, setStore] = useState<Store | null>(null);
    const [storeDetail, setStoreDetail] = useState<StoreDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const loc = useLocation();
    const nav = useNavigate();

    useEffect(() => {
        const fetchStoreData = async () => {
            if (!id) return;
            
            try {
                setLoading(true);
                const [storeResponse, detailResponse] = await Promise.all([
                    fetchStoreByIdAPI(id),
                    fetchStoreDetailAPI(id)
                ]);

                if (storeResponse.status === 200) {
                    setStore(storeResponse.data);
                } else {
                    toast.error(storeResponse.message || 'Failed to fetch store data');
                }

                if (detailResponse.status === 200) {
                    setStoreDetail(detailResponse.data);
                } else {
                    toast.error(detailResponse.message || 'Failed to fetch store details');
                }
            } catch (error) {
                toast.error('Error fetching store data');
            } finally {
                setLoading(false);
            }
        };

        fetchStoreData();
    }, [id]);

    const handleGoBack = () => {
        const state = getNavigationState(loc);
        navigateWithState(nav, '/admin/store-management', state);
    };

    const handleEdit = () => {
        if (store) {
            const state = getNavigationState(loc);
            navigateWithState(nav, `/admin/store-management/edit/${store.storeID}`, {
                ...state,
                store
            });
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (!store) {
        return (
            <div className="p-6 text-center">
                <p className="text-gray-500">Store not found</p>
                <button onClick={handleGoBack} className="mt-4 text-blue-500 hover:text-blue-700">
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="p-6 bg-white rounded-2xl">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Store Details</h2>
                <div className="flex gap-4">
                    <button
                        onClick={handleEdit}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        Edit Store
                    </button>
                    <button
                        onClick={handleGoBack}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        Back
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Store Information */}
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Store Information</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Store Name</label>
                            <p className="text-lg text-gray-900">{store.name}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Address</label>
                            <p className="text-lg text-gray-900">{store.address}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Status</label>
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                                store.status === 'activate' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-red-100 text-red-800'
                            }`}>
                                {store.status === 'activate' ? 'Active' : 'Closed'}
                            </span>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Description</label>
                            <p className="text-lg text-gray-900">{store.description}</p>
                        </div>
                    </div>
                </div>

                {/* Store Statistics */}
                {storeDetail && (
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Store Statistics</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-blue-100 p-4 rounded-lg">
                                <p className="text-sm text-blue-600">Total Tables</p>
                                <p className="text-2xl font-bold text-blue-800">{storeDetail.totalTables}</p>
                            </div>
                            <div className="bg-green-100 p-4 rounded-lg">
                                <p className="text-sm text-green-600">Available</p>
                                <p className="text-2xl font-bold text-green-800">{storeDetail.availableTables}</p>
                            </div>
                            <div className="bg-yellow-100 p-4 rounded-lg">
                                <p className="text-sm text-yellow-600">In Use</p>
                                <p className="text-2xl font-bold text-yellow-800">{storeDetail.currentlyPlaying}</p>
                            </div>
                            <div className="bg-red-100 p-4 rounded-lg">
                                <p className="text-sm text-red-600">Broken</p>
                                <p className="text-2xl font-bold text-red-800">{storeDetail.brokenTables}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Tables List */}
            {store.billiardTables.length > 0 && (
                <div className="mt-6 bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Billiard Tables</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-700">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2">Code</th>
                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">Type</th>
                                    <th className="px-4 py-2">Status</th>
                                    <th className="px-4 py-2">Active</th>
                                </tr>
                            </thead>
                            <tbody>
                                {store.billiardTables.map((table) => (
                                    <tr key={table.billardTableID} className="bg-white border-b">
                                        <td className="px-4 py-2 font-medium">{table.tableCode}</td>
                                        <td className="px-4 py-2">{table.name}</td>
                                        <td className="px-4 py-2">{table.tableType}</td>
                                        <td className="px-4 py-2">
                                            <span className={`px-2 py-1 rounded text-xs ${
                                                table.status === 'available' ? 'bg-green-100 text-green-800' :
                                                table.status === 'inUse' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                                {table.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2">
                                            <span className={`px-2 py-1 rounded text-xs ${
                                                table.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                                {table.active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Customer Statistics */}
            {storeDetail && storeDetail.customers.length > 0 && (
                <div className="mt-6 bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Top Customers</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-700">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2">Customer Name</th>
                                    <th className="px-4 py-2">Match Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {storeDetail.customers.map((customer, index) => (
                                    <tr key={index} className="bg-white border-b">
                                        <td className="px-4 py-2 font-medium">{customer.customerName}</td>
                                        <td className="px-4 py-2">{customer.matchCount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StoreView;