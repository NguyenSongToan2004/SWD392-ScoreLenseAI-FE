import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { getNavigationState, navigateWithState } from '../../../../Utils/navigationUtils';
import type { Role } from '../../../../models/DataObject';
import { getRoleAPI } from '../../services/FetchAPI';

const RoleView = () => {
    const [role, setRole] = useState<Role | null>(null);
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();
    const loc = useLocation();
    const { name } = useParams();

    useEffect(() => {
        // Only run if we're actually on the detail page, not create page
        if (!name || window.location.pathname.includes('/create')) {
            return;
        }
        
        const loadRole = async () => {
            try {
                setLoading(true);

                // Try to get role from navigation state first
                const roleData = getNavigationState<Role>(loc, 'role');

                if (roleData) {
                    setRole(roleData);
                } else if (name) {
                    // Fetch role data from API
                    const response = await getRoleAPI(name);
                    if (response.status === 200) {
                        setRole(response.data);
                    } else {
                        toast.error(response.message || 'Failed to fetch role data.');
                        nav(-1);
                    }
                } else {
                    toast.error('Role information not found');
                    nav(-1);
                }
            } catch (error) {
                toast.error('Error loading role data');
                nav(-1);
            } finally {
                setLoading(false);
            }
        };

        loadRole();
    }, [loc.state, nav, name]);

    const handleGoBack = () => {
        nav(-1);
    };

    const handleEdit = () => {
        if (role) {
            const userInfo = getNavigationState(loc, 'userInfo');
            const store = getNavigationState(loc, 'store');
            navigateWithState(nav, `/admin/role-management/edit/${role.name}`, {
                role,
                userInfo,
                store
            });
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    <p className="mt-2 text-gray-600">Loading role data...</p>
                </div>
            </div>
        );
    }

    if (!role) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600">Role not found</p>
                    <button
                        onClick={handleGoBack}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen h-full bg-gray-50 py-8 px-4 rounded-2xl'>
            <div className='max-w-4xl mx-auto'>
                {/* Header */}
                <div className='bg-white rounded-lg shadow-md mb-6 p-6 top-8 z-10'>
                    <div className='flex items-center justify-between mb-4'>
                        <h2 className='text-3xl font-bold text-gray-800'>Role Details</h2>
                        <div className='flex gap-3'>
                            <button
                                onClick={handleEdit}
                                className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                                Edit
                            </button>
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
                    </div>
                    <div className='h-1 bg-gradient-to-r from-blue-700 to-blue-500 rounded-full'></div>
                </div>

                {/* Role Information */}
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                    {/* Basic Information */}
                    <div className='lg:col-span-2'>
                        <div className='bg-white rounded-lg shadow-md p-6'>
                            <h3 className='text-2xl font-bold text-gray-800 mb-4'>Basic Information</h3>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>Role Name</label>
                                    <div className='p-3 bg-gray-50 rounded-md border'>
                                        {role.name}
                                    </div>
                                </div>

                                <div className='md:col-span-2'>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>Description</label>
                                    <div className='p-3 bg-gray-50 rounded-md border min-h-[100px]'>
                                        {role.description || 'No description available'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Role Summary */}
                    <div className='lg:col-span-1'>
                        <div className='bg-white rounded-lg shadow-md p-6'>
                            <h3 className='text-xl font-bold text-gray-800 mb-4'>Role Summary</h3>

                            <div className='space-y-4'>
                                <div className='text-center p-4 bg-blue-50 rounded-lg'>
                                    <div className='text-3xl font-bold text-blue-600'>
                                        {role.permissions ? role.permissions.length : 0}
                                    </div>
                                    <div className='text-sm text-gray-600'>Total Permissions</div>
                                </div>

                                <div className='text-center p-4 bg-green-50 rounded-lg'>
                                    <div className='text-lg font-semibold text-green-600'>
                                        {role.name}
                                    </div>
                                    <div className='text-sm text-gray-600'>Role Name</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Permissions */}
                <div className='mt-6'>
                    <div className='bg-white rounded-lg shadow-md p-6'>
                        <h3 className='text-2xl font-bold text-gray-800 mb-4'>Permissions</h3>

                        {role.permissions && role.permissions.length > 0 ? (
                            <div className='flex-row flex flex-wrap gap-4'>
                                {role.permissions.map((permission, index) => (
                                    <div key={index} className='border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow'>
                                        <div className='flex items-start justify-between'>
                                            <div className='flex-1'>
                                                <h4 className='font-semibold text-gray-800 mb-2'>
                                                    {permission.name}
                                                </h4>
                                                <p className='text-sm text-gray-600'>
                                                    {permission.description || 'No description available'}
                                                </p>
                                            </div>
                                            <div className='ml-3'>
                                                <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800'>
                                                    Permission
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className='text-center py-8'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-400 mx-auto mb-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                </svg>
                                <p className='text-gray-500 text-lg'>No permissions assigned to this role</p>
                                <p className='text-gray-400 text-sm mt-2'>Click Edit to add permissions</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoleView;
