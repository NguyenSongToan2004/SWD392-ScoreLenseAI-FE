import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { getNavigationState, navigateWithState } from '../../../../Utils/navigationUtils';
import { createPermissionAPI } from '../../services/FetchAPI';
import {
    formatPermissionName,
    validatePermissionForm
} from '../../schemas/permissionValidation';
import type { PermissionRequest } from '../../models/RequestObject';



const PermissionCreate = () => {
    const [form, setForm] = useState<PermissionRequest>({
        name: '',
        description: ''
    });
    const nav = useNavigate();
    const loc = useLocation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === 'name') {
            // Format the permission name automatically using schema function
            const formattedValue = formatPermissionName(value);
            setForm(prev => ({
                ...prev,
                [name]: formattedValue
            }));
        } else {
            setForm(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSave = () => {
        // Validate form using schema function
        const validation = validatePermissionForm(form);
        if (!validation.isValid) {
            toast.error(validation.message || 'Validation failed');
            return;
        }

        const createPermission = async () => {
            try {
                const response = await createPermissionAPI(form);
                if (response.status === 200 || response.status === 201) {
                    toast.success(response.message || 'Permission created successfully');
                    const store = getNavigationState(loc, 'store');
                    const userInfo = getNavigationState(loc, 'userInfo');
                    navigateWithState(nav, "/admin/permission-management", {
                        store,
                        userInfo
                    });
                } else {
                    toast.error(response.message || 'Failed to create permission');
                }
            } catch (error) {
                toast.error('Error creating permission');
            }
        }
        createPermission();
    };

    const handleGoBack = () => {
        nav(-1);
    };

    return (
        <div className='min-h-screen max-h-screen bg-gray-50 py-8 px-4 overflow-y-auto'>
            <div className='max-w-2xl mx-auto'>
                {/* Header */}
                <div className='bg-white rounded-lg shadow-md mb-6 p-6 sticky top-8 z-10'>
                    <div className='flex items-center justify-between mb-4'>
                        <h2 className='text-3xl font-bold text-gray-800'>Create Permission</h2>
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

                    <div className='flex gap-3'>
                        <button
                            onClick={handleSave}
                            className='px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors'
                        >
                            Create Permission
                        </button>
                    </div>
                </div>

                {/* Form */}
                <div className='bg-white rounded-lg shadow-md p-6'>
                    <div className='space-y-6'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Permission Name <span className='text-red-500'>*</span>
                            </label>
                            <input
                                type='text'
                                name='name'
                                value={form.name}
                                onChange={handleChange}
                                className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent'
                                placeholder='Enter permission name (e.g., CREATE_USER, MANAGE_TABLES)'
                            />
                            <p className='text-sm text-gray-500 mt-1'>
                                Permission name will be automatically formatted to uppercase without spaces or special characters
                            </p>
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Description
                            </label>
                            <textarea
                                name='description'
                                value={form.description}
                                onChange={handleChange}
                                rows={4}
                                className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent'
                                placeholder='Enter permission description'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PermissionCreate;
