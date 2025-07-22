import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchStoreByIdAPI, updateStoreAPI } from '../services/FetchAPI';
import type { Store, StoreRequest } from '../models/RequestObject';

const StoreEdit = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [store, setStore] = useState<Store | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editForm, setEditForm] = useState<StoreRequest>({
        name: '',
        address: '',
        status: 'activate',
        description: ''
    });

    useEffect(() => {
        if (id) {
            loadStore();
        }
    }, [id]);

    const loadStore = async () => {
        if (!id) return;
        
        try {
            setLoading(true);
            const response = await fetchStoreByIdAPI(id);
            
            if (response.status === 1000) {
                const storeData = response.data;
                setStore(storeData);
                setEditForm({
                    name: storeData.name,
                    address: storeData.address,
                    status: storeData.status,
                    description: storeData.description
                });
            }
        } catch (error) {
            console.error('Error loading store:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;

        try {
            setSaving(true);
            const response = await updateStoreAPI(id, editForm);
            
            if (response.status === 1000) {
                alert('Store updated successfully!');
                navigate(`/admin/store-management/detail/${id}`);
            } else {
                alert('Failed to update store');
            }
        } catch (error) {
            console.error('Error updating store:', error);
            alert('Failed to update store');
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        navigate('/admin/store-management');
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg">Loading store...</div>
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
                <h1 className="text-2xl font-bold text-gray-800">Edit Store</h1>
                <button
                    onClick={handleCancel}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    Cancel
                </button>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Store Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={editForm.name}
                                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                                placeholder="Enter store name"
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                                Status <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="status"
                                value={editForm.status}
                                onChange={(e) => setEditForm({ ...editForm, status: e.target.value as 'activate' | 'closed' })}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="activate">Activate</option>
                                <option value="closed">Closed</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                            Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="address"
                            value={editForm.address}
                            onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                            placeholder="Enter store address"
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="description"
                            value={editForm.description}
                            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={4}
                            required
                            placeholder="Enter store description"
                        />
                    </div>

                    <div className="flex justify-end space-x-3 pt-6 border-t">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-6 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                            disabled={saving}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
                            disabled={saving}
                        >
                            {saving ? 'Updating...' : 'Update Store'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StoreEdit;
