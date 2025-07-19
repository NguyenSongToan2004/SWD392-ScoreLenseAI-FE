import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { getNavigationState, navigateWithState } from '../../../../Utils/navigationUtils';
import type { Customer } from '../../../../models/DataObject';
import { getCustomerAPI } from '../../services/FetchAPI';

const CustomerView = () => {
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();
    const loc = useLocation();
    const { id } = useParams();

    useEffect(() => {
        const loadCustomer = async () => {
            try {
                setLoading(true);

                // Try to get customer from navigation state first
                const customerData = getNavigationState<Customer>(loc, 'customer');

                if (customerData) {
                    setCustomer(customerData);
                } else if (id) {
                    // Fetch customer data from API
                    const response = await getCustomerAPI(id);
                    if (response.status === 200 || response.status === 1000) {
                        setCustomer(response.data);
                    } else {
                        toast.error(response.message || 'Failed to fetch customer data.');
                        nav(-1);
                    }
                } else {
                    toast.error('Customer information not found');
                    nav(-1);
                }
            } catch (error) {
                toast.error('Error loading customer data');
                nav(-1);
            } finally {
                setLoading(false);
            }
        };

        loadCustomer();
    }, [loc.state, nav, id]);

    const handleGoBack = () => {
        nav(-1);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    <p className="mt-2 text-gray-600">Loading customer data...</p>
                </div>
            </div>
        );
    }

    if (!customer) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-lg text-gray-500">Customer not found</p>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6 md:p-8 bg-white rounded-2xl h-full">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Customer Details</h2>
                <button
                    onClick={handleGoBack}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                    Back
                </button>
            </div>

            <div className="max-w-4xl mx-auto">
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <div className="flex items-center gap-6 mb-6">
                        {customer.imageUrl ? (
                            <img
                                src={customer.imageUrl}
                                alt={customer.name || 'Customer'}
                                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                            />
                        ) : (
                            <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center border-4 border-white shadow-lg">
                                <span className="text-gray-600 font-bold text-2xl">
                                    {customer.name?.charAt(0)?.toUpperCase() || customer.email?.charAt(0)?.toUpperCase()}
                                </span>
                            </div>
                        )}
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900">{customer.name || 'N/A'}</h3>
                            <p className="text-lg text-gray-600">{customer.email}</p>
                            <span className={`inline-block px-3 py-1 text-sm rounded-full mt-2 ${
                                customer.status === 'active' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-red-100 text-red-800'
                            }`}>
                                {customer.status}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h4>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Customer ID</label>
                                <p className="text-gray-900 font-mono text-sm">{customer.customerID}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Full Name</label>
                                <p className="text-gray-900">{customer.name || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Email</label>
                                <p className="text-gray-900">{customer.email}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Phone Number</label>
                                <p className="text-gray-900">{customer.phoneNumber || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Date of Birth</label>
                                <p className="text-gray-900">{customer.dob || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Customer Type</label>
                                <p className="text-gray-900">{customer.type || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">Account Information</h4>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Status</label>
                                <span className={`inline-block px-3 py-1 text-sm rounded-full ${
                                    customer.status === 'active' 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-red-100 text-red-800'
                                }`}>
                                    {customer.status}
                                </span>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Created At</label>
                                <p className="text-gray-900">{customer.createAt}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Updated At</label>
                                <p className="text-gray-900">{customer.updateAt || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerView;