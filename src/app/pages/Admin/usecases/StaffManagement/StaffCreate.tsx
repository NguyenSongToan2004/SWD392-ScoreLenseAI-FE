import React, { useCallback, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import type { User } from '../../../../models/DataObject'
import { formatDateForAPI } from '../../../../Utils/formatters'
import { getNavigationState, navigateWithState } from '../../../../Utils/navigationUtils'
import type { UserAccountRequest } from '../../models/RequestObject'
import InputStore from '../../partials/InputStore'
import SelectStaff from '../../partials/SelectStaff'
import { createStaffAPI } from '../../services/FetchAPI'

interface StaffCreateForm extends UserAccountRequest {
    confirmPassword: string;
}

const StaffCreate = () => {
    const [form, setForm] = useState<StaffCreateForm>({
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        dob: '',
        address: '',
        role: 'STAFF',
        managerID: localStorage.getItem('userID') as string,
        storeID: localStorage.getItem('storeID') as string
    });

    const [loading, setLoading] = useState(false);
    const nav = useNavigate();
    const loc = useLocation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const target = e.target as HTMLInputElement;
        const { name, value, type } = target;

        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? target.checked : value,
        }));
    };

    const handleManagerChange = useCallback((value: string) => {
        setForm(prev => ({
            ...prev,
            managerID: value
        }));
    }, []);

    const handleRoleChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedRole = e.target.value;
        setForm(prev => ({
            ...prev,
            role: selectedRole // Set single role value
        }));
    }, []);

    const validateForm = (): boolean => {
        if (!form.name.trim()) {
            toast.error('Staff name is required');
            return false;
        }

        if (!form.email.trim()) {
            toast.error('Email is required');
            return false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            toast.error('Please enter a valid email address');
            return false;
        }

        if (!form.password) {
            toast.error('Password is required');
            return false;
        }

        if (form.password.length < 6) {
            toast.error('Password must be at least 6 characters long');
            return false;
        }

        if (form.password !== form.confirmPassword) {
            toast.error('Passwords do not match');
            return false;
        }

        return true;
    };

    const handleSave = async () => {
        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);
            const userInfo = getNavigationState(loc, 'userInfo') as User;
            // const storeId = userInfo?.store?.storeID || localStorage.getItem("storeID");

            // Remove confirmPassword from the request data
            const { confirmPassword, ...createData } = form;

            // Format date to ISO format that Java LocalDate can parse
            const formattedData = {
                ...createData,
                dob: form.dob ? formatDateForAPI(form.dob) : '',
            };

            const response = await createStaffAPI(formattedData);

            if (response.status === 200 || response.status === 201) {
                toast.success(response.message || 'Staff created successfully');
                const store = getNavigationState(loc, 'store');
                navigateWithState(nav, "/admin/staff-management", { store, userInfo });
            } else {
                toast.error(response.message || 'Failed to create staff');
            }
        } catch (error) {
            toast.error('Error creating staff');
        } finally {
            setLoading(false);
        }
    };

    const handleGoBack = () => {
        nav(-1);
    };

    return (
        <div className='min-h-screen bg-gray-50 py-8 px-4 overflow-y-auto'>
            <div className='max-w-2xl mx-auto'>
                {/* Header */}
                <div className='bg-white rounded-lg shadow-md mb-6 p-6'>
                    <div className='flex items-center justify-between mb-4'>
                        <h2 className='text-3xl font-bold text-gray-800'>Create New Staff</h2>
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
                    <div className='h-1 bg-gradient-to-r from-green-700 to-green-500 rounded-full'></div>
                </div>

                {/* Form */}
                <div className='bg-white rounded-lg shadow-md p-6 mb-8'>
                    <div className='space-y-6'>
                        {/* Staff Name */}
                        <div>
                            <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                Staff Name *
                            </label>
                            <input
                                type='text'
                                name='name'
                                value={form.name}
                                onChange={handleChange}
                                placeholder='Enter staff name'
                                className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-700 focus:outline-none transition-colors text-lg'
                                required
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                Email *
                            </label>
                            <input
                                type='email'
                                name='email'
                                value={form.email}
                                onChange={handleChange}
                                placeholder='Enter email address'
                                className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-700 focus:outline-none transition-colors text-lg'
                                required
                            />
                        </div>

                        <div className='flex flex-row gap-4'>
                            {/* Phone Number */}
                            <div className='flex-1'>
                                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                    Phone Number
                                </label>
                                <input
                                    type='tel'
                                    name='phoneNumber'
                                    value={form.phoneNumber}
                                    onChange={handleChange}
                                    placeholder='Enter phone number'
                                    className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-700 focus:outline-none transition-colors text-lg'
                                />
                            </div>

                            {/* Date of Birth */}
                            <div className='flex-1'>
                                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                    Date of Birth
                                </label>
                                <input
                                    type='date'
                                    name='dob'
                                    value={form.dob}
                                    onChange={handleChange}
                                    className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-700 focus:outline-none transition-colors text-lg'
                                />
                            </div>
                        </div>

                        {/* Address */}
                        <div>
                            <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                Address
                            </label>
                            <textarea
                                name='address'
                                value={form.address}
                                onChange={handleChange}
                                placeholder='Enter address'
                                rows={3}
                                className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-700 focus:outline-none transition-colors text-lg resize-none'
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                Password *
                            </label>
                            <input
                                type='password'
                                name='password'
                                value={form.password}
                                onChange={handleChange}
                                placeholder='Enter password (min 6 characters)'
                                className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-700 focus:outline-none transition-colors text-lg'
                                required
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                Confirm Password *
                            </label>
                            <input
                                type='password'
                                name='confirmPassword'
                                value={form.confirmPassword}
                                onChange={handleChange}
                                placeholder='Confirm password'
                                className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-700 focus:outline-none transition-colors text-lg'
                                required
                            />
                        </div>

                        <div className='flex flex-row gap-4'>
                            {/* Manager Selection */}
                            <div className='flex-2/3'>
                                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                    Manager
                                </label>
                                <SelectStaff
                                    value={form.managerID}
                                    onChange={handleManagerChange}
                                    placeholder="Select a manager (optional)"
                                    className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-700 focus:outline-none transition-colors text-lg bg-white'
                                />
                            </div>

                            <div className='flex-1/3'>
                                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                    Store
                                </label>
                                <InputStore />
                            </div>
                        </div>

                        {/* Role Selection */}
                        <div>
                            <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                Role *
                            </label>
                            <select
                                name='role'
                                value={form.role}
                                onChange={handleRoleChange}
                                className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-700 focus:outline-none transition-colors text-lg bg-white'
                                required
                            >
                                <option value='ADMIN'>Admin</option>
                                <option value='STAFF'>Staff</option>
                                <option value='MANAGER'>Manager</option>
                            </select>
                        </div>
                    </div>

                    {/* Permissions Selection */}
                    {/* <div>
                        <label className='block text-sm font-semibold text-gray-700 mb-2'>
                            Permissions
                        </label>
                        <SelectRoles
                            value={form.roles}
                            onChange={handlePermissionsChange}
                        />
                    </div> */}

                    {/* Action Buttons */}
                    <div className='flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200'>
                        <button
                            onClick={handleGoBack}
                            className='px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium'
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className='px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            {loading ? 'Creating...' : 'Create Staff'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StaffCreate
