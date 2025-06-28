
// --- COMPONENT CON CHO CÁC THẺ THỐNG KÊ ---

// SỬA 1: Interface được cập nhật để `icon` là một string (đường dẫn ảnh)
interface StatCardProps {
    title: string;
    value: number;
    icon: string; // <-- Thay đổi từ React.ReactNode sang string
    color: 'orange' | 'green' | 'blue' | 'red';
}

const StatCard = ({ title, value, icon, color }: StatCardProps) => {
    const colorClasses = {
        orange: 'border-l-orange-500',
        green: 'border-l-green-500',
        blue: 'border-l-blue-500',
        red: 'border-l-red-500',
    };

    const colorTextClass = {
        orange: 'text-orange-500',
        green: 'text-green-500',
        blue: 'text-blue-500',
        red: 'text-red-500',
    };

    return (
        <div className={`flex items-center p-4 bg-white rounded-lg shadow-md border-l-4 ${colorClasses[color]}`}>
            <div className="mr-4">
                {/* SỬA 2: Sử dụng thẻ <img> để hiển thị icon từ đường dẫn */}
                <img src={icon} alt={title} className="w-12 h-12" />
            </div>
            <div>
                <p className="text-sm font-medium text-gray-600">{title}</p>
                <p className={`text-3xl font-bold text-gray-900 ${colorTextClass[color]}`}>{value}</p>
            </div>
        </div>
    );
};

export default StatCard
