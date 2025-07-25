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
    const end = endTime ? dayjs(endTime) : dayjs(); 
    const totalSeconds = end.diff(start, 'second');

    if (totalSeconds < 0) return '00:00';

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
};

/**
 * Format date for API requests (Java LocalDate format)
 * Converts YYYY-MM-DD to proper ISO format
 */
export const formatDateForAPI = (dateString: string): string => {
    if (!dateString) return '';
    
    // Parse the date parts
    const [year, month, day] = dateString.split('-').map(Number);
    
    // Create a valid ISO date string that Java's LocalDate can parse
    // Format: yyyy-MM-dd
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};
