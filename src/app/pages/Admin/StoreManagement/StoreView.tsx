import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchStoreByIdAPI, fetchStoreDetailAPI } from '../services/FetchAPI';
import type { Store, StoreDetailData } from '../models/RequestObject';

const StoreView = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [store, setStore] = useState<Store | null>(null);
    const [storeDetail, setStoreDetail] = useState<StoreDetailData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            loadStoreDetails();
        }
    }, [id]);

    const loadStoreDetails = async () => {
        if (!id) return;
        
        try {
            setLoading(true);
            const [storeResponse, detailResponse] = await Promise.all([
                fetchStoreByIdAPI(id),
                fetchStoreDetailAPI(id)
            ]);
            
            if (storeResponse.status === 1000) {
                setStore(storeResponse.data);
            }
            
            if (detailResponse.status === 1000) {
                setStoreDetail(detailResponse.data);
            }
        } catch (error) {
            console.error('Error loading store details:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg">Loading store details...</div>
            </div>
        );
    }

    if (!store) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg text-red-600">Store not found</div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Store Details</h1>
                <div className="space-x-3">
                    <button
                        onClick={() => navigate(`/admin/store-management/edit/${id}`)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        Edit Store
                    </button>
                    <button
                        onClick={() => navigate('/admin/store-management')}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        Back to List
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
                        <div className="text-lg font-semibold text-gray-900">{store.name}</div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                        <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                            store.status === 'activate' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                        }`}>
                            {store.status}
                        </span>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                        <div className="text-gray-900">{store.address}</div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <div className="text-gray-900">{store.description}</div>
                    </div>
                </div>

                {storeDetail && (
                    <>
                        <div className="border-t pt-6 mb-6">
                            <h3 className="text-lg font-semibold mb-4 text-gray-800">Store Statistics</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-blue-50 p-4 rounded-lg text-center">
                                    <div className="text-3xl font-bold text-blue-600">{storeDetail.totalTables}</div>
                                    <div className="text-sm text-gray-600">Total Tables</div>
                                </div>
                                <div className="bg-green-50 p-4 rounded-lg text-center">
                                    <div className="text-3xl font-bold text-green-600">{storeDetail.availableTables}</div>
                                    <div className="text-sm text-gray-600">Available</div>
                                </div>
                                <div className="bg-yellow-50 p-4 rounded-lg text-center">
                                    <div className="text-3xl font-bold text-yellow-600">{storeDetail.currentlyPlaying}</div>
                                    <div className="text-sm text-gray-600">In Use</div>
                                </div>
                                <div className="bg-red-50 p-4 rounded-lg text-center">
                                    <div className="text-3xl font-bold text-red-600">{storeDetail.brokenTables}</div>
                                    <div className="text-sm text-gray-600">Broken</div>
                                </div>
                            </div>
                        </div>

                        {storeDetail.customers.length > 0 && (
                            <div className="border-t pt-6">
                                <h3 className="text-lg font-semibold mb-4 text-gray-800">Recent Customers</h3>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="space-y-3">
                                        {storeDetail.customers.map((customer, index) => (
                                            <div key={index} className="flex justify-between items-center p-3 bg-white rounded border">
                                                <span className="font-medium text-gray-900">{customer.customerName}</span>
                                                <span className="text-sm text-gray-600 bg-blue-100 px-2 py-1 rounded">
                                                    {customer.matchCount} matches
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}

                {store.billiardTables.length > 0 && (
                    <div className="border-t pt-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Billiard Tables ({store.billiardTables.length})</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {store.billiardTables.map((table) => (
                                <div key={table.billardTableID} className="bg-gray-50 p-4 rounded-lg border">
                                    <div className="font-semibold text-gray-900 mb-2">{table.name}</div>
                                    <div className="text-sm text-gray-600 mb-1">Code: {table.tableCode}</div>
                                    <div className="text-sm text-gray-600 mb-1">Type: {table.tableType}</div>
                                    <div className="text-sm text-gray-600 mb-2">{table.description}</div>
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                        table.status === 'available' 
                                            ? 'bg-green-100 text-green-800'
                                            : table.status === 'inUse'
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {table.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StoreView;
