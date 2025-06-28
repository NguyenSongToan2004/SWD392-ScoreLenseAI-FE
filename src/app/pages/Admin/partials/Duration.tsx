import React, { useState, useEffect } from 'react';
import { calculateDuration } from '../../../Utils/formatters'; // Import hàm tính toán

// 1. Định nghĩa các props mà component này cần
interface DurationProps {
  status: 'pending' | 'ongoing' | 'completed' | 'cancelled';
  startTime: string;
  endTime?: string | null; // endTime là tùy chọn
}

const Duration: React.FC<DurationProps> = ({ status, startTime, endTime }) => {
    // 2. Toàn bộ state và logic tính toán được chuyển vào đây
    const [duration, setDuration] = useState('00:00');

    useEffect(() => {
        // Logic y hệt như cũ, nhưng giờ dùng props thay vì state `match`
        if (status === 'ongoing') {
            const interval = setInterval(() => {
                setDuration(calculateDuration(startTime));
            }, 1000);
            // Hàm dọn dẹp để dừng interval
            return () => clearInterval(interval);
        } else if (status === 'completed' && endTime) {
            // Nếu trận đấu đã kết thúc, chỉ tính 1 lần và không cần interval
            setDuration(calculateDuration(startTime, endTime));
        }
    }, [status, startTime, endTime]); // 3. Effect sẽ chạy lại nếu các props này thay đổi

    // 4. Component trả về JSX để hiển thị kết quả
    return (
        <span className="font-bold text-blue-600">
            {duration}
        </span>
    );
}

export default Duration;