import React, { useEffect, useState, useCallback } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import type { User } from '../../../../models/DataObject'
import { getNavigationState, navigateWithState } from '../../../../Utils/navigationUtils'
import type { EditUserAccountRequest } from '../../models/RequestObject'
import { getStaffAPI, editStaffAPI } from '../../services/FetchAPI'
import SelectStaff from '../../partials/SelectStaff'
import { formatDateForAPI } from '../../../../Utils/formatters'

const StaffEdit = () => {
    const [form, setForm] = useState<EditUserAccountRequest>({
        name: '',
        email: '',
        phoneNumber: '',
        dob: '',
        address: '',
        status: 'active',
        role: '',
        managerID: '',
        storeID: ''
    });
    const [staff, setStaff] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();
    const loc = useLocation();
    const { id } = useParams();

    useEffect(() => {
        const loadStaff = async () => {
            try {
                setLoading(true);

                const staffFromState = getNavigationState<User>(loc, 'staff');

                if (staffFromState) {
                    setStaff(staffFromState);
                    setForm({
                        name: staffFromState.name || '',
                        email: staffFromState.email || '',
                        phoneNumber: staffFromState.phoneNumber || '',
                        dob: staffFromState.dob || '',
                        address: staffFromState.address || '',
                        status: staffFromState.status?.toLowerCase() === 'active' ? 'active' : 'inActive',
                        role: staffFromState.role || '',
                        managerID: staffFromState.manager || '',
                        storeID: staffFromState.store?.storeID || ''
                    });
                } else if (id) {
                    const response = await getStaffAPI(id);
                    if (response.status === 200 && response.data) {
                        const staffData = response.data as User;
                        setStaff(staffData);
                        setForm({
                            name: staffData.name || '',
                            email: staffData.email || '',
                            phoneNumber: staffData.phoneNumber || '',
                            dob: staffData.dob || '',
                            address: staffData.address || '',
                            status: staffData.status?.toLowerCase() === 'active' ? 'active' : 'inActive',
                            role: staffData.role || '',
                            managerID: staffData.manager || '',
                            storeID: staffData.store?.storeID || ''
                        });
                    } else {
                        toast.error('Failed to load staff data');
                        nav(-1);
                    }
                } else {
                    toast.error('Staff information not found');
                    nav(-1);
                }
            } catch (error) {
                toast.error('Error loading staff data');
                nav(-1);
            } finally {
                setLoading(false);
            }
        };

        loadStaff();
    }, [id, loc, nav]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = e.target as HTMLInputElement;
        const { name, value, type } = target;

        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? target.checked : value,
        }));
    }, []);

    const handleManagerChange = useCallback((value: string) => {
        setForm(prev => ({
            ...prev,
            managerID: value
        }));
    }, []);

    const handleSave = async () => {
        if (!form.name.trim()) {
            toast.error('Staff name is required');
            return;
        }

        if (!form.email.trim()) {
            toast.error('Email is required');
            return;
        }

        if (!form.role) {
            toast.error('Role is required');
            return;
        }

        try {
            setLoading(true);

            // Format date for API
            const formattedData = {
                ...form,
                dob: form.dob ? formatDateForAPI(form.dob) : '',
            };

            const response = await editStaffAPI(formattedData, staff?.staffID || id!);

            if (response.status === 200) {
                toast.success(response.message || 'Staff updated successfully');
                const store = getNavigationState(loc, 'store');
                const userInfo = getNavigationState(loc, 'userInfo');
                navigateWithState(nav, "/admin/staff-management", { store, userInfo });
            } else {
                toast.error(response.message || 'Failed to update staff');
            }
        } catch (error) {
            toast.error('Error updating staff');
        } finally {
            setLoading(false);
        }
    };

    const handleGoBack = () => {
        nav(-1);
    };

    if (loading && !staff) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    <p className="mt-2 text-gray-600">Loading staff data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6 md:p-8 max-h-screen overflow-y-auto bg-white rounded-2xl">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Edit Staff</h2>
                <button
                    onClick={handleGoBack}
                    className="border rounded-xl px-4 py-2 border-gray-500 text-gray-800 cursor-pointer hover:bg-gray-800 hover:text-white transition-colors"
                >
                    ← Back
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Staff Name *
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email *
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={form.phoneNumber}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="active">Active</option>
                            <option value="inActive">Inactive</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            name="dob"
                            value={form.dob}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Address
                        </label>
                        <input
                            type="text"
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Role *
                        </label>
                        <select
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select a role</option>
                            <option value="ADMIN">Admin</option>
                            <option value="STAFF">Staff</option>
                            <option value="MANAGER">Manager</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Manager
                        </label>
                        <SelectStaff
                            value={form.managerID}
                            onChange={handleManagerChange}
                            placeholder="Select a manager (optional)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Store
                        </label>
                        <input
                            type="text"
                            name="storeID"
                            value={form.storeID}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-4 mt-6">
                    <button
                        onClick={handleGoBack}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StaffEdit;
