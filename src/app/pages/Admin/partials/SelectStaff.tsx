import { useEffect, useState, memo } from "react"
import type { User } from "../../../models/DataObject";
import { fetchAllStaffsAPI } from "../services/FetchAPI";
import { toast } from "sonner";

interface SelectStaffProps {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
}

const SelectStaff = memo(({ value, onChange, placeholder = "Select a manager (optional)", className }: SelectStaffProps) => {
    const [staffList, setStaffList] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                setLoading(true);
                const response = await fetchAllStaffsAPI();
                if (response.status === 200 && Array.isArray(response.data)) {
                    setStaffList(response.data);
                } else {
                    toast.error(response.message || 'Failed to fetch staff data.');
                    setStaffList([]);
                }
            } catch (error) {
                toast.error('Error fetching staff data');
                setStaffList([]);
            } finally {
                setLoading(false);
            }
        }

        fetchStaff();
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value);
    };

    return (
        <select
            value={value || ''}
            onChange={handleChange}
            disabled={loading}
            className={className || 'w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-700 focus:outline-none transition-colors text-lg bg-white'}
        >
            <option value="">{loading ? 'Loading...' : placeholder}</option>
            {staffList.map((staff) => (
                <option key={staff.staffID} value={staff.staffID}>
                    {staff.name} - {staff.email}
                </option>
            ))}
        </select>
    )
})

SelectStaff.displayName = 'SelectStaff';

export default SelectStaff
