
// const BackLog = () => {
//     return (
//         <div className="h-full flex flex-col items-center overflow-hidden w-full">
//             <div className="flex-1 flex flex-col rounded-md w-[600px] p-3 bg-[#d2dfb9] overflow-hidden">
//                 <div className="text-black pr-2 flex-1 overflow-y-auto">
//                     {[
//                         { time: "18:58", shot: "#27", color: "text-green-700", player: "PLAYER 1", result: "SCORED" },
//                         { time: "19:00", shot: "#28", color: "text-red-600", player: "PLAYER 2", result: "MISSED" },
//                         { time: "19:04", shot: "#29", color: "text-red-600", player: "PLAYER 1", result: "MISSED" },
//                         { time: "19:10", shot: "#30", color: "text-green-700", player: "PLAYER 2", result: "SCORED" },
//                         { time: "19:15", shot: "#31", color: "text-red-600", player: "PLAYER 1", result: "MISSED" },
//                         { time: "19:18", shot: "#32", color: "text-green-700", player: "PLAYER 2", result: "SCORED" },
//                         { time: "19:20", shot: "#33", color: "text-green-700", player: "PLAYER 1", result: "SCORED" },
//                         // thêm bao nhiêu dòng cũng được
//                         { time: "19:20", shot: "#33", color: "text-green-700", player: "PLAYER 1", result: "SCORED" },
//                         { time: "19:20", shot: "#33", color: "text-green-700", player: "PLAYER 1", result: "SCORED" },

//                     ].map((entry, index) => (
//                         <div key={index} className="flex justify-between py-1 text-md font-semibold">
//                             <div className="flex gap-2 w-1/2">
//                                 <span>{entry.time}</span>
//                                 <span className={entry.color}>SHOT {entry.shot}</span>
//                             </div>
//                             <div className="flex gap-4 w-2/3 justify-end text-left">
//                                 <span className="text-left">{entry.player}</span>
//                                 <span
//                                     className="text-red-600"
//                                     style={entry.result === "MISSED" ? {} : { color: 'var(--primary-color)' }}
//                                 >
//                                     {entry.result}
//                                 </span>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default BackLog

import { useCallback, useEffect, useRef, useState } from 'react';
import { useStomp } from '../../../hooks/useStomp'; // Điều chỉnh đường dẫn nếu cần
import { useSubscription } from '../../../hooks/useSubscription'; // Điều chỉnh đường dẫn nếu cần

// Định nghĩa kiểu dữ liệu cho một log entry để code an toàn hơn
interface LogEntry {
    time: string;
    shot: string;
    player: string;
    result: 'SCORED' | 'MISSED';
}

// Định nghĩa kiểu dữ liệu nhận về từ WebSocket (dựa trên ví dụ của bạn)
interface ShotEventPayload {
    time: string;
    shot: string;
    player: string;
    result: 'SCORED' | 'MISSED';
    // Thêm các thuộc tính khác nếu có từ server
}


const BackLog = () => {
    // State để lưu trữ danh sách các log entries
    const [logEntries, setLogEntries] = useState<LogEntry[]>([]);

    // Ref để tham chiếu đến div chứa log, giúp tự động cuộn xuống
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // 1. Khởi tạo và quản lý kết nối Stomp client
    const { client, isConnected } = useStomp();

    // 2. Định nghĩa hàm callback để xử lý message mới từ WebSocket
    // Sử dụng useCallback để tránh việc hàm này được tạo lại không cần thiết
    const handleNewShotEvent = useCallback((payload: ShotEventPayload) => {
        // Thêm log mới vào đầu danh sách để hiển thị mới nhất ở trên
        // Hoặc cuối danh sách: [...prevEntries, newEntry]
        setLogEntries(prevEntries => [payload, ...prevEntries]);
    }, []); // Hàm này không có dependency nên mảng rỗng

    // 3. Đăng ký (subscribe) vào topic '/topic/shot_event'
    // Hook này sẽ tự động quản lý việc subscribe/unsubscribe
    useSubscription(client, isConnected, '/topic/shot_event', handleNewShotEvent);

    // Hiệu ứng để tự động cuộn xuống dưới cùng khi có log mới
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            // Cuộn lên trên cùng vì chúng ta thêm item mới vào đầu mảng
            container.scrollTop = 0;
        }
    }, [logEntries]); // Chạy mỗi khi logEntries thay đổi

    return (
        <div className="h-full flex flex-col items-center overflow-hidden w-full">
            <div className="flex-1 flex flex-col rounded-md w-[600px] p-3 bg-[#d2dfb9] overflow-hidden">
                {/* Div chứa nội dung log, có ref để điều khiển cuộn */}
                <div ref={scrollContainerRef} className="text-black pr-2 flex-1 overflow-y-auto">
                    {/* Hiển thị thông báo khi chưa có log hoặc chưa kết nối */}
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

                    {/* Render danh sách log từ state */}
                    {logEntries.map((entry, index) => {
                        // Xác định màu sắc dựa trên kết quả
                        const resultColor = entry.result === 'SCORED' ? 'var(--primary-color)' : '#dc2626'; // text-red-600

                        // Key ở đây nên là một giá trị duy nhất từ server nếu có, ví dụ entry.id
                        // Dùng index có thể gây ra vấn đề nếu danh sách thay đổi (xóa/sắp xếp lại)
                        return (
                            <div key={`${entry.shot}-${index}`} className="flex justify-between py-1 text-md font-semibold animate-fade-in">
                                <div className="flex gap-2 w-1/2">
                                    <span>{entry.time}</span>
                                    <span className={entry.result === 'SCORED' ? 'text-green-700' : 'text-red-600'}>
                                        SHOT {entry.shot}
                                    </span>
                                </div>
                                <div className="flex gap-4 w-2/3 justify-end text-left">
                                    <span className="text-left">{entry.player}</span>
                                    <span style={{ color: resultColor, fontWeight: 'bold' }}>
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

