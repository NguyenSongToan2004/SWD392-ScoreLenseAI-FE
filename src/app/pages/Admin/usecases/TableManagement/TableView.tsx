import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getNavigationState, navigateWithState } from "../../../../Utils/navigationUtils";
import type { BilliardTable } from "../../../Home/models/DataObject";

const TableView = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const table = getNavigationState<BilliardTable>(location, 'table');

    useEffect(() => {
        if (!table) {
            toast.error('Không tìm thấy thông tin bàn');
            navigate(-1);
        }
    }, [table, navigate]);

    if (!table) {
        return <div>Loading...</div>;
    }

    const handleGoBack = () => {
        const userInfo = getNavigationState(location, 'userInfo');
        const store = getNavigationState(location, 'store');
        navigateWithState(navigate, "/admin/table-management", { 
            userInfo,
            store 
        });
    };

    // Handle case where there is no table data
    if (!table) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
                <div className="bg-white p-8 rounded-lg shadow-xl text-center">
                    <h3 className="text-xl font-bold text-red-600 mb-4">Error</h3>
                    <p className="text-gray-700">Table data not found. Please go back and select a table to view.</p>
                    <button
                        onClick={handleGoBack}
                        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    // Detail page UI
    return (
        <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen max-h-screen overflow-y-auto">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md">
                {/* Page Header */}
                <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Table Details: {table.name}
                    </h2>
                    <button
                        onClick={handleGoBack}
                        className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                        Back
                    </button>
                </div>

                {/* Detailed Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <div className="p-3 rounded-md bg-gray-50 border-2 border-green-700">
                            <dt className="text-sm font-medium text-gray-500">Table Code</dt>
                            <dd className="mt-1 text-lg font-semibold text-gray-900">{table.tableCode}</dd>
                        </div>
                        <div className="p-3 rounded-md bg-gray-50 border-2 border-green-700">
                            <dt className="text-sm font-medium text-gray-500">Table Name</dt>
                            <dd className="mt-1 text-lg font-semibold text-gray-900">{table.name}</dd>
                        </div>
                        <div className="p-3 rounded-md bg-gray-50 border-2 border-green-700">
                            <dt className="text-sm font-medium text-gray-500">Table Type</dt>
                            <dd className="mt-1 text-lg font-semibold text-gray-900">{table.tableType}</dd>
                        </div>
                        <div className="p-3 rounded-md bg-gray-50 border-2 border-green-700">
                            <dt className="text-sm font-medium text-gray-500">Status</dt>
                            <dd className="mt-1 text-lg font-semibold text-gray-900">{table.status}</dd>
                        </div>
                        <div className="col-span-1 md:col-span-2 p-3 rounded-md bg-gray-50 border-2 border-green-700">
                            <dt className="text-sm font-medium text-gray-500">Description</dt>
                            <dd className="mt-1 text-base text-gray-900 whitespace-pre-wrap">{table.description}</dd>
                        </div>
                        <div className="p-3 rounded-md bg-gray-50 border-2 border-green-700">
                            <dt className="text-sm font-medium text-gray-500">Active</dt>
                            <dd className="mt-1">
                                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${table.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {table.active ? 'Active' : 'Inactive'}
                                </span>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default TableView;
