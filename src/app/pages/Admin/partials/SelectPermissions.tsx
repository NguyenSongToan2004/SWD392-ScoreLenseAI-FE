import { useEffect, useState, memo } from "react"
import type { Permission } from '../models/ResponseObject'
import { fetchPermissionAPI } from '../services/FetchAPI';
import { toast } from "sonner";

interface SelectPermissionsProps {
    value?: string[];
    onChange?: (value: string[]) => void;
    className?: string;
}

const SelectRoles = memo(({ value = [], onChange, className }: SelectPermissionsProps) => {
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                setLoading(true);
                const response = await fetchPermissionAPI();
                if (response.status === 200 && Array.isArray(response.data)) {
                    setPermissions(response.data);
                } else {
                    toast.error(response.message || 'Failed to fetch permissions.');
                    setPermissions([]);
                }
            } catch (error) {
                toast.error('Error fetching permissions');
                setPermissions([]);
            } finally {
                setLoading(false);
            }
        }

        fetchPermissions();
    }, [])
    
    const handlePermissionChange = (permissionName: string, checked: boolean) => {
        if (checked) {
            onChange?.([...value, permissionName]);
        } else {
            onChange?.(value.filter(p => p !== permissionName));
        }
    };

    const handleSelectAll = () => {
        if (value.length === permissions.length) {
            onChange?.([]);
        } else {
            onChange?.(permissions.map(p => p.name));
        }
    };

    if (loading) {
        return (
            <div className="p-4 border-2 border-gray-300 rounded-lg bg-gray-50">
                <p className="text-gray-600">Loading permissions...</p>
            </div>
        );
    }

    return (
        <div className={className || "border-2 border-gray-300 rounded-lg bg-white"}>
            <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-700">Select Permissions</h4>
                    <button
                        type="button"
                        onClick={handleSelectAll}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                        {value.length === permissions.length ? 'Deselect All' : 'Select All'}
                    </button>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                    {value.length} of {permissions.length} permissions selected
                </p>
            </div>

            <div className="max-h-60 overflow-y-auto p-4">
                {permissions.length > 0 ? (
                    <div className="space-y-3">
                        {permissions.map((permission) => (
                            <label
                                key={permission.name}
                                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-transparent hover:border-gray-200 transition-colors"
                            >
                                <input
                                    type="checkbox"
                                    checked={value.includes(permission.name)}
                                    onChange={(e) => handlePermissionChange(permission.name, e.target.checked)}
                                    className="mt-1 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                />
                                <div className="flex-1">
                                    <div className="font-medium text-gray-900">{permission.name}</div>
                                    {permission.description && (
                                        <div className="text-sm text-gray-600 mt-1">{permission.description}</div>
                                    )}
                                </div>
                            </label>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 py-4">No permissions available</p>
                )}
            </div>
        </div>
    )
})

export default SelectRoles