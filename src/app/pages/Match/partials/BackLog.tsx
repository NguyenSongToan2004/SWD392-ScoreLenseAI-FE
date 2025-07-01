import { useCallback, useEffect, useRef, useState } from 'react';
import { useStomp } from '../../../hooks/useStomp'; // Điều chỉnh đường dẫn nếu cần
import { useSubscription } from '../../../hooks/useSubscription'; // Điều chỉnh đường dẫn nếu cần

// Kiểu dữ liệu nhận về từ WebSocket (khớp với class ShotEvent của Spring Boot)
interface ShotEventPayload {
    time: string;
    shot: string;
    player: string;
    result: 'SCORED' | 'MISSED';
}

const BackLog = () => {
    // State để lưu trữ danh sách các log entries
    const [logEntries, setLogEntries] = useState<ShotEventPayload[]>([]);

    // Ref để tham chiếu đến div chứa log, giúp tự động cuộn
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // 1. Khởi tạo và quản lý kết nối Stomp client
    const { client, isConnected } = useStomp();

    // 2. Định nghĩa hàm callback để xử lý message mới từ WebSocket
    const handleNewShotEvent = useCallback((payload: ShotEventPayload) => {
        // Thêm log mới vào đầu danh sách để hiển thị mới nhất ở trên
        setLogEntries(prevEntries => [payload, ...prevEntries]);
    }, []);

    // 3. Đăng ký (subscribe) vào topic '/topic/shot_event'
    useSubscription(client, isConnected, '/topic/shot_event', handleNewShotEvent);

    // Hiệu ứng để tự động cuộn lên trên cùng khi có log mới
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.scrollTop = 0;
        }
    }, [logEntries]); // Chạy mỗi khi logEntries thay đổi

    // Giao diện render, sử dụng cấu trúc JSX bạn cung cấp làm gốc
    return (
        <div className="h-full flex flex-col items-center overflow-hidden w-full">
            <div className="flex-1 flex flex-col rounded-md w-[600px] p-3 bg-[#d2dfb9] overflow-hidden">
                <div ref={scrollContainerRef} className="text-black pr-2 flex-1 overflow-y-auto">
                    {/* Hiển thị thông báo chờ, giữ nguyên logic cũ */}
                    {!isConnected && (
                        <div className="flex justify-center items-center h-full text-gray-500 font-semibold">
                            Connecting to server...
                        </div>
                    )}
                    {isConnected && logEntries.length === 0 && (
                        <div className="flex justify-center items-center h-full text-gray-500 font-semibold">
                            Waiting for shot events...
                        </div>
                    )}

                    {/* Render danh sách log từ state, sử dụng cấu trúc của bạn */}
                    {logEntries.map((entry, index) => {
                        // Tinh chỉnh nhỏ: Tạo biến màu sắc dựa trên 'result' từ dữ liệu động
                        const colorClass = entry.result === 'SCORED' ? 'text-green-700' : 'text-red-600';

                        return (
                            <div key={`${entry.shot}-${index}`} className="flex justify-between items-center py-1 text-md font-semibold">
                                {/* Cột trái */}
                                <div className="flex items-center gap-2">
                                    <span>{entry.time.substring(0, 5)}</span>
                                    {/* Sử dụng biến colorClass vừa tạo */}
                                    <span className={colorClass}>
                                        {/* Backend đã gửi cả chữ "SHOT ", nên chỉ cần hiển thị entry.shot */}
                                        {entry.shot}
                                    </span>
                                </div>

                                {/* Cột phải */}
                                <div className="flex items-center gap-4 text-left">
                                    <span>{entry.player}</span>
                                    {/* Sửa lại cách áp dụng màu cho nhất quán và chính xác */}
                                    <span className={`${colorClass} font-bold`}>
                                        {entry.result}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default BackLog;