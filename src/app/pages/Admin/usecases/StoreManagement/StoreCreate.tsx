import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { getNavigationState } from '../../../../Utils/navigationUtils';
import type { StoreRequest } from '../../models/RequestObject';
import { createStoreAPI } from '../../services/FetchAPI';

const StoreCreate = () => {
    const [form, setForm] = useState<StoreRequest>({
        name: '',
        address: '',
        status: 'activate',
        description: ''
    });
    const [loading, setLoading] = useState(false);
    const loc = useLocation();
    const nav = useNavigate();

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

        try {
            setLoading(true);
            const response = await createStoreAPI(form);

            if (response.status === 200) {
                toast.success(response.message || 'Store created successfully');
                nav('/admin/store-management', {
                    state: {
                        userInfo: getNavigationState(loc, 'userInfo'),
                        store: getNavigationState(loc, 'store')
                    }
                });
            } else {
                toast.error(response.message || 'Failed to create store');
            }
        } catch (error) {
            toast.error('Error creating store');
        } finally {
            setLoading(false);
        }
    };

    const handleGoBack = () => {
        nav('/admin/store-management', {
            state: {
                userInfo: getNavigationState(loc, 'userInfo'),
                store: getNavigationState(loc, 'store')
            }
        });
    };

    return (
        <div className="p-6 bg-white rounded-2xl">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Create New Store</h2>
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
                        {loading ? 'Creating...' : 'Create Store'}
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

export default StoreCreate;