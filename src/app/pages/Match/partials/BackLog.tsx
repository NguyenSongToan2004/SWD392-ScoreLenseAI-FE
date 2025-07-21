import { useCallback, useEffect, useRef, useState } from 'react';
import { useStomp } from '../../../hooks/useStomp';
import { useSubscription } from '../../../hooks/useSubscription';

// Kiểu dữ liệu nhận về từ WebSocket
interface ShotEventPayload {
    time: string;
    shot: string;
    player: string;
    result: 'SCORED' | 'MISSED';
}

interface ReceivedData {
    code: string;
    data: ShotEventPayload;
}

interface BackLogProps {
    tableID: string;
}

const BackLog = ({ tableID }: BackLogProps) => {
    const [logEntries, setLogEntries] = useState<ReceivedData[]>([]);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const { client, isConnected } = useStomp();

    const handleNewShotEvent = useCallback((payload: ReceivedData) => {
        setLogEntries(prevEntries => [payload, ...prevEntries]);
    }, []);

    useSubscription(client, isConnected, `/topic/shot_event/${tableID}`, handleNewShotEvent);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.scrollTop = 0;
        }
    }, [logEntries]);

    return (
        <div className="h-full flex flex-col items-center overflow-hidden w-full">
            <div className="flex-1 flex flex-col rounded-md w-[600px] p-3 bg-[#d2dfb9] overflow-hidden">
                <div ref={scrollContainerRef} className="text-black pr-2 flex-1 overflow-y-auto">
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

                    {logEntries.map((entry, index) => {
                        const colorClass = entry.data.result === 'SCORED' ? 'text-green-700' : 'text-red-600';
                        const timeDisplay = entry.data.time.split('.')[0].substring(0, 5);

                        return (
                            <div key={`${entry.data.shot}-${index}`} className="flex justify-between items-center py-1 text-md font-semibold">
                                <div className="flex items-center gap-2">
                                    <span>{timeDisplay}</span>
                                    <span className={colorClass}>
                                        {entry.data.shot}
                                    </span>
                                </div>

                                <div className="flex items-center gap-4 text-left">
                                    <span>{entry.data.player}</span>
                                    <span className={`${colorClass} font-bold`}>
                                        {entry.data.result}
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
