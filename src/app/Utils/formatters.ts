// src/utils/formatters.ts
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/vi';

/**
 * Định dạng chuỗi thời gian sang 'HH:mm'
 */

// --- Cấu hình toàn cục đặt ở đây ---
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('vi');
dayjs.tz.setDefault('Asia/Ho_Chi_Minh');
// ---------------------------------

export const formatTime = (dateString: string | null): string => {
    if (!dateString) return '';
    // Day.js có thể parse trực tiếp chuỗi ISO
    return dayjs(dateString).format('HH:mm');
};

/**
 * Tính toán khoảng thời gian
 */
export const calculateDuration = (startTime: string, endTime?: string | null): string => {
    const start = dayjs(startTime);
    console.log(start);
    const end = endTime ? dayjs(endTime) : dayjs(); // Dùng thời gian hiện tại nếu không có endTime
    console.log(end);
    console.log('------------');
    const totalSeconds = end.diff(start, 'second');

    if (totalSeconds < 0) return '00:00';

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
};