import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { getNavigationState, navigateWithState } from '../../../../Utils/navigationUtils';
import type { Permission } from '../../models/ResponseObject';
import type { Role } from '../../../../models/DataObject';
import { createRoleAPI, fetchPermissionAPI, getRoleAPI } from '../../services/FetchAPI';
import type { AddPermissionRequest } from '../../models/RequestObject';

const PermissionAdd = () => {
    const [role, setRole] = useState<Role | null>(null);
    const [allPermissions, setAllPermissions] = useState<Permission[]>([]);
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const nav = useNavigate();
    const loc = useLocation();
    const { name } = useParams();

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);

                const roleData = getNavigationState<Role>(loc, 'role');

                let roleInfo: Role | null = null;

                if (roleData) {
                    roleInfo = roleData;
                } else if (name) {
                    // Fetch role data from API
                    const response = await getRoleAPI(name);
                    if (response.status === 200) {
                        roleInfo = response.data;
                    } else {
                        toast.error(response.message || 'Failed to fetch role data.');
                        nav(-1);
                        return;
                    }
                } else {
                    toast.error('Role information not found');
                    nav(-1);
                    return;
                }

                setRole(roleInfo);

                // Set initially selected permissions
                if (roleInfo?.permissions) {
                    setSelectedPermissions(roleInfo.permissions.map(p => p.name));
                }

                // Fetch all available permissions
                const permissionsResponse = await fetchPermissionAPI();
                if (permissionsResponse.status === 200 && Array.isArray(permissionsResponse.data)) {
                    setAllPermissions(permissionsResponse.data);
                } else {
                    toast.error(permissionsResponse.message || 'Failed to fetch permissions.');
                }
            } catch (error) {
                toast.error('Error loading data');
                nav(-1);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [loc, nav, name]);

    const handleGoBack = () => {
        nav(-1);
    };

    const handleTogglePermission = (permissionName: string) => {
        setSelectedPermissions(prev => {
            if (prev.includes(permissionName)) {
                return prev.filter(p => p !== permissionName);
            } else {
                return [...prev, permissionName];
            }
        });
    };

    const handleSave = async () => {
        if (!role) return;

        try {
            setLoading(true);
            const requestData: AddPermissionRequest = {
                name: role.name,
                description: role.description || '',
                permissions: selectedPermissions
            };
            
            const response = await createRoleAPI(requestData);

            if (response.status === 200 || response.status === 1000) {
                toast.success(response.message || 'Permissions updated successfully');
                const userInfo = getNavigationState(loc, 'userInfo');
                const store = getNavigationState(loc, 'store');

                // Navigate back to detail page to trigger fresh data fetch
                navigateWithState(nav, `/admin/role-management/detail/${role.name}`, {
                    userInfo,
                    store,
                    refreshData: Date.now() // Add timestamp to force refresh
                });
            } else {
                toast.error(response.message || 'Failed to update permissions');
            }
        } catch (error) {
            toast.error('Error updating permissions');
        } finally {
            setLoading(false);
        }
    };

    // Filter permissions based on search term
    const filteredPermissions = allPermissions.filter(permission =>
        permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (permission.description && permission.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    <p className="mt-2 text-gray-600">Loading data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen max-h-screen bg-gray-50 py-8 px-4 overflow-y-auto'>
            <div className='max-w-4xl mx-auto'>
                {/* Header */}
                <div className='bg-white rounded-lg shadow-md mb-6 p-6'>
                    <div className='flex items-center justify-between mb-4'>
                        <h2 className='text-3xl font-bold text-gray-800'>Manage Permissions for {role?.name}</h2>
                        <button
                            onClick={handleGoBack}
                            className='flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                            Back
                        </button>
                    </div>
                    <div className='h-1 bg-gradient-to-r from-blue-700 to-blue-500 rounded-full'></div>
                </div>

                {/* Search and Actions */}
                <div className='bg-white rounded-lg shadow-md p-6 mb-6'>
                    <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
                        <div className='flex-1'>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Search permissions..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <button
                                onClick={() => setSelectedPermissions([])}
                                className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50'
                            >
                                Clear All
                            </button>
                            <button
                                onClick={() => setSelectedPermissions(allPermissions.map(p => p.name))}
                                className='px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-md hover:bg-blue-700'
                            >
                                Select All
                            </button>
                            <button
                                onClick={handleSave}
                                className='px-4 py-2 text-sm font-medium text-white bg-green-600 border border-green-600 rounded-md hover:bg-green-700'
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <div className='text-sm text-gray-600'>
                            <span className='font-medium'>{selectedPermissions.length}</span> of <span className='font-medium'>{allPermissions.length}</span> permissions selected
                        </div>
                    </div>
                </div>

                {/* Permissions List */}
                <div className='bg-white rounded-lg shadow-md p-6'>
                    <h3 className='text-xl font-bold text-gray-800 mb-4'>Available Permissions</h3>

                    {filteredPermissions.length > 0 ? (
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            {filteredPermissions.map((permission) => (
                                <div
                                    key={permission.name}
                                    className={`border rounded-lg p-4 transition-colors ${selectedPermissions.includes(permission.name)
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <div className='flex items-start'>
                                        <div className='flex-shrink-0 pt-0.5'>
                                            <input
                                                type="checkbox"
                                                id={`permission-${permission.name}`}
                                                checked={selectedPermissions.includes(permission.name)}
                                                onChange={() => handleTogglePermission(permission.name)}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                        </div>
                                        <label
                                            htmlFor={`permission-${permission.name}`}
                                            className='ml-3 flex-1 cursor-pointer'
                                        >
                                            <div className='font-medium text-gray-800'>{permission.name}</div>
                                            <div className='text-sm text-gray-500 mt-1'>{permission.description || 'No description available'}</div>
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='text-center py-8'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-400 mx-auto mb-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                            <p className='text-gray-500 text-lg'>No permissions found</p>
                            <p className='text-gray-400 text-sm mt-2'>Try adjusting your search</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PermissionAdd;
