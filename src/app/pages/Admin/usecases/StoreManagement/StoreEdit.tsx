import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { getNavigationState, navigateWithState } from '../../../../Utils/navigationUtils';
import type { Store } from '../../models/ResponseObject';
import { fetchStoreByIdAPI, updateStoreAPI } from '../../services/FetchAPI';

const StoreEdit = () => {
    const { id } = useParams<{ id: string }>();
    const [form, setForm] = useState({
        name: '',
        address: '',
        status: 'activate',
        description: ''
    });
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const loc = useLocation();
    const nav = useNavigate();
    const store = loc.state?.store as Store;

    useEffect(() => {
        const fetchStoreData = async () => {
            if (store) {
                setForm({
                    name: store.name,
                    address: store.address,
                    status: store.status,
                    description: store.description
                });
                setInitialLoading(false);
            } else if (id) {
                try {
                    const response = await fetchStoreByIdAPI(id);
                    if (response.status === 200) {
                        const storeData = response.data;
                        setForm({
                            name: storeData.name,
                            address: storeData.address,
                            status: storeData.status,
                            description: storeData.description
                        });
                    } else {
                        toast.error(response.message || 'Failed to fetch store data');
                    }
                } catch (error) {
                    toast.error('Error fetching store data');
                } finally {
                    setInitialLoading(false);
                }
            }
        };

        fetchStoreData();
    }, [id, store]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!form.name.trim() || !form.address.trim()) {
            toast.error('Please fill in all required fields');
            return;
        }

        if (!id) {
            toast.error('Store ID not found');
            return;
        }

        try {
            setLoading(true);
            const response = await updateStoreAPI(id, form);
            
            if (response.status === 200) {
                toast.success(response.message || 'Store updated successfully');
                const state = getNavigationState(loc);
                navigateWithState(nav, '/admin/store-management', state);
            } else {
                toast.error(response.message || 'Failed to update store');
            }
        } catch (error) {
            toast.error('Error updating store');
        } finally {
            setLoading(false);
        }
    };

    const handleGoBack = () => {
        const state = getNavigationState(loc);
        navigateWithState(nav, '/admin/store-management', state);
    };

    if (initialLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-white rounded-2xl">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Edit Store</h2>
                <button
                    onClick={handleGoBack}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    Back
                </button>
            </div>

            <form onSubmit={handleSubmit} className="max-w-2xl">
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Store Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter store name"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter store address"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Status
                        </label>
                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="activate">Active</option>
                            <option value="closed">Closed</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter store description"
                        />
                    </div>
                </div>

                <div className="flex gap-4 mt-8">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                        {loading ? 'Updating...' : 'Update Store'}
                    </button>
                    <button
                        type="button"
                        onClick={handleGoBack}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default StoreEdit;