import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import type { User } from '../../../../models/DataObject'
import { getNavigationState, navigateWithState } from '../../../../Utils/navigationUtils'
import { getStaffAPI } from '../../services/FetchAPI'

const StaffView = () => {
    const [staff, setStaff] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();
    const loc = useLocation();
    const { id } = useParams();

    useEffect(() => {
        const loadStaff = async () => {
            try {
                setLoading(true);

                // Try to get staff from navigation state first
                const staffFromState = getNavigationState<User>(loc, 'staff');

                if (staffFromState) {
                    setStaff(staffFromState);
                } else if (id) {
                    // Fetch staff data from API
                    const response = await getStaffAPI(id);
                    if (response.status === 200 && response.data) {
                        setStaff(response.data as User);
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

    const handleGoBack = () => {
        nav(-1);
    };

    const handleEdit = () => {
        if (staff) {
            const userInfo = getNavigationState(loc, 'userInfo');
            const store = getNavigationState(loc, 'store');
            navigateWithState(nav, `/admin/staff-management/edit/${staff.staffID}`, {
                staff,
                userInfo,
                store
            });
        }
    };

    const getStatusBadge = (status: string) => {
        const statusColors = {
            'ACTIVE': 'bg-green-100 text-green-800',
            'INACTIVE': 'bg-red-100 text-red-800',
            'PENDING': 'bg-yellow-100 text-yellow-800'
        };
        return statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800';
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    <p className="mt-2 text-gray-600">Loading staff data...</p>
                </div>
            </div>
        );
    }

    if (!staff) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600">Staff not found</p>
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
        <div className='min-h-screen max-h-screen bg-gray-50 py-8 px-4 overflow-y-auto'>
            <div className='max-w-4xl mx-auto'>
                {/* Header */}
                <div className='bg-white rounded-lg shadow-md mb-6 p-6 sticky top-8 z-10'>
                    <div className='flex items-center justify-between mb-4'>
                        <h2 className='text-3xl font-bold text-gray-800'>Staff Details</h2>
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

                {/* Staff Information */}
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                    {/* Profile Card */}
                    <div className='lg:col-span-1'>
                        <div className='bg-white rounded-lg shadow-md p-6'>
                            <div className='text-center'>
                                {staff.imageUrl ? (
                                    <img
                                        src={staff.imageUrl}
                                        alt={staff.name}
                                        className='w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-gray-200'
                                    />
                                ) : (
                                    <div className='w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-gray-400">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 19.5h15a2.25 2.25 0 002.25-2.25v-11.25A2.25 2.25 0 0019.5 6h-15a2.25 2.25 0 00-2.25 2.25v11.25A2.25 2.25 0 004.5 19.5z" />
                                        </svg>
                                    </div>
                                )}
                                <h3 className='text-xl font-bold text-gray-800'>{staff.name}</h3>
                                <p className={`text-sm font-semibold px-2 py-1 rounded-full ${getStatusBadge(staff.status)}`}>{staff.status}</p>
                            </div>
                            <div className='mt-4'>
                                <h4 className='text-lg font-semibold text-gray-700'>Contact Information</h4>
                                <div className='mt-2'>
                                    <p className='text-gray-600'><strong>Email:</strong> {staff.email}</p>
                                    <p className='text-gray-600'><strong>Phone:</strong> {staff.phoneNumber}</p>
                                </div>
                            </div>
                            <div className='mt-4'>
                                <h4 className='text-lg font-semibold text-gray-700'>Address</h4>
                                <p className='text-gray-600'>{staff.address}</p>
                            </div>
                        </div>
                    </div>

                    {/* Staff Details */}
                    <div className='lg:col-span-2'>
                        <div className='bg-white rounded-lg shadow-md p-6'>
                            <h3 className='text-2xl font-bold text-gray-800'>Staff Details</h3>
                            <div className='mt-4'>
                                <h4 className='text-lg font-semibold text-gray-700'>Basic Information</h4>
                                <div className='mt-2'>
                                    <p className='text-gray-600'><strong>Staff ID:</strong> {staff.staffID}</p>
                                    <p className='text-gray-600'><strong>Join Date:</strong> {formatDate(staff.createAt)}</p>
                                </div>
                            </div>
                            <div className='mt-6'>
                                <h4 className='text-lg font-semibold text-gray-700'>Personal Information</h4>
                                <div className='mt-2'>
                                    <p className='text-gray-600'><strong>Date of Birth:</strong> {formatDate(staff.dob)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StaffView
