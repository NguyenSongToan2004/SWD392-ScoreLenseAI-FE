import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getNavigationState, navigateWithState } from "../../../../Utils/navigationUtils";
import type { Permission } from "../../models/ResponseObject";
// import { fetchPermissionAPI } from "../../services/FetchAPI";
import { fetchPermissionAPI } from "../../services/FetchMock/PermissionAPI";

const PermissionManagement = () => {
    const [permissionList, setPermissionList] = useState<Permission[]>([]);
    const [filteredPermissions, setFilteredPermissions] = useState<Permission[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isLoad, setIsLoad] = useState<boolean>(false);
    const loc = useLocation();
    const nav = useNavigate();

    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const response = await fetchPermissionAPI();
                if (response.status === 200 && Array.isArray(response.data)) {
                    setPermissionList(response.data);
                    setFilteredPermissions(response.data);
                } else {
                    toast.error(response.message || 'Failed to fetch permission data.');
                    setPermissionList([]);
                    setFilteredPermissions([]);
                }
            } catch (error) {
                setPermissionList([]);
                setFilteredPermissions([]);
                toast.error('Error fetching permissions');
            }
        }
        fetchPermissions();
    }, [isLoad]);

    // Filter permissions based on search term
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredPermissions(permissionList);
        } else {
            const filtered = permissionList.filter(permission =>
                permission.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredPermissions(filtered);
        }
    }, [searchTerm, permissionList]);

    const handleSearch = (value: string) => {
        setSearchTerm(value);
    };

    const handleAction = (actionType: 'detail' | 'edit' | 'delete', permission: Permission) => {
        const userInfo = getNavigationState(loc, 'userInfo');
        const store = getNavigationState(loc, 'store');

        switch (actionType) {
            case 'detail':
                navigateWithState(nav, `/admin/permission-management/detail/${permission.name}`, {
                    permission,
                    userInfo,
                    store
                });
                break;
            case 'edit':
                navigateWithState(nav, `/admin/permission-management/edit/${permission.name}`, {
                    permission,
                    userInfo,
                    store
                });
                break;
            case 'delete':
                if (window.confirm(`Are you sure you want to delete permission ${permission.name}?`)) {
                    toast.success('Permission deleted successfully');
                    setIsLoad(!isLoad);
                }
                break;
        }
    };

    return (
        <div className="p-4 sm:p-6 md:p-8 max-h-full bg-white rounded-2xl">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Permission Management</h2>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Search permissions by name..."
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="shadow-md rounded-lg h-full">
                {filteredPermissions.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-base text-left text-gray-700">
                            <thead className="text-2xl text-gray-800 uppercase bg-gray-100 sticky top-0">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Name</th>
                                    <th scope="col" className="px-6 py-3">Description</th>
                                    <th scope="col" className="px-6 py-3">Action</th>
                                </tr>
                            </thead>    
                            <tbody className="max-h-96 overflow-y-auto">
                                {filteredPermissions.map((permission) => (
                                    <tr key={permission.name} className="bg-white border-b hover:bg-gray-50 text-xl">
                                        <td className="px-6 py-4">{permission.name}</td>
                                        <td className="px-6 py-4 truncate max-w-sm" title={permission.description}>
                                            {permission.description}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-x-4">
                                                <button
                                                    title="Detail"
                                                    className="text-gray-500 hover:text-gray-800 focus:outline-none cursor-pointer"
                                                    onClick={() => handleAction("detail", permission)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639l4.418-5.58a1.012 1.012 0 0 1 .59-.283h8.91a1.012 1.012 0 0 1 .59.283l4.418 5.58a1.012 1.012 0 0 1 0 .639l-4.418 5.58a1.012 1.012 0 0 1-.59.283h-8.91a1.012 1.012 0 0 1-.59-.283L2.036 12.322Z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                    </svg>
                                                </button>
                                                {/* <button
                                                    title="Edit"
                                                    className="text-blue-500 hover:text-blue-800 focus:outline-none cursor-pointer"
                                                    onClick={() => handleAction("edit", permission)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                    </svg>
                                                </button> */}
                                                {/* <button
                                                    title="Delete"
                                                    className="text-red-500 hover:text-red-800 focus:outline-none cursor-pointer"
                                                    onClick={() => handleAction("delete", permission)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                    </svg>
                                                </button> */}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-400 mx-auto mb-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                        <p className="text-gray-500 text-lg">No permissions found</p>
                        <p className="text-gray-400 text-sm mt-2">Try adjusting your search</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PermissionManagement

