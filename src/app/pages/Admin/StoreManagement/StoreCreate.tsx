import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createStoreAPI } from '../services/FetchAPI';
import type { StoreRequest } from '../models/RequestObject';

const StoreCreate = () => {
    const navigate = useNavigate();
    const [saving, setSaving] = useState(false);
    const [createForm, setCreateForm] = useState<StoreRequest>({
        name: '',
        address: '',
        status: 'activate',
        description: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setSaving(true);
            const response = await createStoreAPI(createForm);
            
            if (response.status === 1000) {
                alert('Store created successfully!');
                navigate('/admin/store-management');
            } else {
                alert('Failed to create store');
            }
        } catch (error) {
            console.error('Error creating store:', error);
            alert('Failed to create store');
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        navigate('/admin/store-management');
    };

    const handleReset = () => {
        setCreateForm({
            name: '',
            address: '',
            status: 'activate',
            description: ''
        });
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Create New Store</h1>
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
                                value={createForm.name}
                                onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
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
                                value={createForm.status}
                                onChange={(e) => setCreateForm({ ...createForm, status: e.target.value as 'activate' | 'closed' })}
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
                            value={createForm.address}
                            onChange={(e) => setCreateForm({ ...createForm, address: e.target.value })}
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
                            value={createForm.description}
                            onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={4}
                            required
                            placeholder="Enter store description"
                        />
                    </div>

                    <div className="flex justify-end space-x-3 pt-6 border-t">
                        <button
                            type="button"
                            onClick={handleReset}
                            className="px-6 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                            disabled={saving}
                        >
                            Reset
                        </button>
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
                            {saving ? 'Creating...' : 'Create Store'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StoreCreate;
