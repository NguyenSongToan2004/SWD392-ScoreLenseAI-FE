import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { getNavigationState, navigateWithState } from '../../../../Utils/navigationUtils';
import type { Permission } from '../../models/ResponseObject';
import { createRoleAPI, fetchPermissionAPI } from '../../services/FetchAPI';
import type { AddPermissionRequest } from '../../models/RequestObject';

const RoleCreate = () => {
    console.log('RoleCreate component rendered');
    
    const [form, setForm] = useState<AddPermissionRequest>({
        name: '',
        description: '',
        permissions: []
    });
    const [allPermissions, setAllPermissions] = useState<Permission[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const nav = useNavigate();
    const loc = useLocation();

    useEffect(() => {
        const loadPermissions = async () => {
            try {
                setLoading(true);
                const response = await fetchPermissionAPI();
                if (response.status === 200 && Array.isArray(response.data)) {
                    setAllPermissions(response.data);
                } else {
                    toast.error(response.message || 'Failed to fetch permissions.');
                }
            } catch (error) {
                toast.error('Error loading permissions');
            } finally {
                setLoading(false);
            }
        };

        loadPermissions();
    }, []);

    if (loading && allPermissions.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    <p className="mt-2 text-gray-600">Loading permissions...</p>
                </div>
            </div>
        );
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleTogglePermission = (permissionName: string) => {
        setForm(prev => ({
            ...prev,
            permissions: prev.permissions.includes(permissionName)
                ? prev.permissions.filter(p => p !== permissionName)
                : [...prev.permissions, permissionName]
        }));
    };

    const handleSave = async () => {
        if (!form.name.trim()) {
            toast.error('Role name is required');
            return;
        }

        try {
            setLoading(true);
            const response = await createRoleAPI(form);

            if (response.status === 200 || response.status === 201 || response.status === 1000) {
                toast.success(response.message || 'Role created successfully');
                const userInfo = getNavigationState(loc, 'userInfo');
                const store = getNavigationState(loc, 'store');

                navigateWithState(nav, '/admin/role-management', {
                    userInfo,
                    store
                });
            } else {
                toast.error(response.message || 'Failed to create role');
            }
        } catch (error) {
            toast.error('Error creating role');
        } finally {
            setLoading(false);
        }
    };

    const handleGoBack = () => {
        nav(-1);
    };

    const filteredPermissions = allPermissions.filter(permission =>
        permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        permission.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4 sm:p-6 md:p-8 bg-white rounded-2xl h-full">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Create New Role</h2>
                <button
                    onClick={handleGoBack}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                    Back
                </button>
            </div>

            <div className="max-w-4xl mx-auto">
                {/* Basic Information */}
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Role Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Role Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter role name (e.g., ADMIN, MANAGER)"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                rows={3}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter role description"
                            />
                        </div>
                    </div>
                </div>

                {/* Permissions Selection */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-gray-800">Permissions</h3>
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Search permissions..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setForm(prev => ({ ...prev, permissions: [] }))}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                                Clear All
                            </button>
                            <button
                                onClick={() => setForm(prev => ({ ...prev, permissions: allPermissions.map(p => p.name) }))}
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-md hover:bg-blue-700"
                            >
                                Select All
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={loading}
                                className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-green-600 rounded-md hover:bg-green-700 disabled:opacity-50"
                            >
                                {loading ? 'Creating...' : 'Create Role'}
                            </button>
                        </div>
                    </div>

                    <div className="text-sm text-gray-600 mb-4">
                        Selected: {form.permissions.length} of {allPermissions.length} permissions
                    </div>

                    {filteredPermissions.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                            {filteredPermissions.map((permission) => (
                                <div
                                    key={permission.name}
                                    className={`border rounded-lg p-4 transition-colors cursor-pointer ${
                                        form.permissions.includes(permission.name)
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                    onClick={() => handleTogglePermission(permission.name)}
                                >
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 pt-0.5">
                                            <input
                                                type="checkbox"
                                                id={`permission-${permission.name}`}
                                                checked={form.permissions.includes(permission.name)}
                                                onChange={() => handleTogglePermission(permission.name)}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                        </div>
                                        <label
                                            htmlFor={`permission-${permission.name}`}
                                            className="ml-3 cursor-pointer flex-1"
                                        >
                                            <div className="font-medium text-gray-900">{permission.name}</div>
                                            <div className="text-sm text-gray-500">{permission.description}</div>
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            No permissions found matching your search.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RoleCreate;



