import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { getNavigationState } from '../../../../Utils/navigationUtils';
import type { Permission } from '../../models/ResponseObject';
import { getPermissionAPI } from '../../services/FetchAPI';

const PermissionView = () => {
    const [permission, setPermission] = useState<Permission | null>(null);
    const nav = useNavigate();
    const loc = useLocation();
    const { name } = useParams();

    useEffect(() => {
        const permissionData = getNavigationState<Permission>(loc, 'permission');
        if (permissionData) {
            setPermission(permissionData);
        } else {
            const getPermission = async () => {
                const response = await getPermissionAPI(name as string);
                if (response.status === 200) {
                    setPermission(response.data);
                } else {
                    toast.error(response.message || 'Failed to fetch permission data.');
                    nav(-1);
                }
            }

            getPermission();
            nav(-1);
        }
    }, [loc.state, nav, name]);

    const handleGoBack = () => {
        nav(-1);
    };

    if (!permission) {
        return <div>Loading...</div>;
    }

    return (
        <div className='min-h-screen max-h-screen bg-gray-50 py-8 px-4 overflow-y-auto'>
            <div className='max-w-2xl mx-auto'>
                {/* Header */}
                <div className='bg-white rounded-lg shadow-md mb-6 p-6 sticky top-8 z-10'>
                    <div className='flex items-center justify-between mb-4'>
                        <h2 className='text-3xl font-bold text-gray-800'>Permission Details</h2>
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

                {/* Permission Information */}
                <div className='bg-white rounded-lg shadow-md p-6'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>Permission Name</label>
                            <div className='p-3 bg-gray-50 rounded-md border'>
                                {permission.name}
                            </div>
                        </div>

                        <div className='md:col-span-2'>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>Description</label>
                            <div className='p-3 bg-gray-50 rounded-md border min-h-[100px]'>
                                {permission.description || 'No description available'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PermissionView;