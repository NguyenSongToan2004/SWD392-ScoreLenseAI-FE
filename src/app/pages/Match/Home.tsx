// import { useCallback, useEffect, useState } from "react";
// import { useLocation, useParams } from "react-router-dom";
// import { type BilliardMatch } from "../../models/DataObject";
// import "./home.css";
// import BackLog from "./partials/BackLog";
// import Header from "./partials/Header";
// import TableScore from "./partials/TableScore";
// import { fetchMatchAPI, updateScoreAPI } from "./services/FetchAPI";
// import { useStomp } from "../../hooks/useStomp";
// import { useSubscription } from "../../hooks/useSubscription";
// import { toast } from "sonner";
// import GameResultPopup from "./partials/GameResultPopup";

// // --- TỐI ƯU: Tạo các component placeholder để xử lý UI ---
// const LoadingComponent = () => (
//     <div className="w-screen h-screen flex justify-center items-center gradient-bg text-white text-2xl">
//         Loading match data...
//     </div>
// );

// const ErrorComponent = ({ message }: { message: string }) => (
//     <div className="w-screen h-screen flex justify-center items-center gradient-bg text-red-400 text-2xl">
//         Error: {message}
//     </div>
// );


// export default function Match() {
//     const location = useLocation();
//     const { id } = useParams<{ id: string }>();
//     const [showPopup, setShowPopup] = useState(false);

//     // --- TỐI ƯU 1: Thêm state cho loading và error ---
//     const [match, setMatch] = useState<BilliardMatch | null>(location.state?.match ?? null);
//     const [isLoading, setIsLoading] = useState<boolean>(!match); // Nếu không có match ban đầu, đặt là đang loading
//     const [error, setError] = useState<string | null>(null);
//     // --- 1. Thiết lập kết nối STOMP ---
//     const { client, isConnected } = useStomp();

//     const handleMatchUpdate = useCallback((updatedMatch: BilliardMatch) => {
//         console.log('Received match update:', updatedMatch);
//         setMatch(updatedMatch);
//     }, []);

//     const handleNewLog = useCallback((logMessage: any) => {
//         console.log('Received new log:', logMessage);
//         // Cập nhật state chứa log ở đây...
//         // setLogs(prevLogs => [logMessage, ...prevLogs]);
//     }, []);

//     // --- 3. Subscribe vào các topic cần thiết ---
//     // Hook này sẽ tự động quản lý việc subscribe và unsubscribe.
//     // Topic động dựa trên `id` của trận đấu.
//     useSubscription(client, isConnected, `/topic/match/${id}`, handleMatchUpdate);
//     useSubscription(client, isConnected, `/topic/log/${id}`, handleNewLog);

//     // --- 4. Gửi message (publish) ---
//     const handleScoreUpdate = (teamID: number, delta: string) => {
//         // Kiểm tra client và trạng thái kết nối trước khi gửi
//         // if (client && isConnected && id) {
//         //     console.log(`%cPublishing score update for player ${playerId}`, 'color: purple');
//         //     const payload = { teamId, playerId, delta };

//         //     // Thay thế việc gọi API bằng cách publish qua STOMP
//         //     client.publish({
//         //         destination: `/app/match/${id}/score`, // Endpoint trên backend để xử lý
//         //         body: JSON.stringify(payload),
//         //     });
//         // }
//         const updateScore = async () => {
//             if (match) {
//                 const response = await updateScoreAPI(match.billiardMatchID, teamID, delta);
//                 if (response.status === 200) {
//                     setMatch(response.data);
//                     toast.success(response.message);
//                 }
//             } else {
//                 toast.error('Không tìm thấy trận đấu');
//             }
//         }
//         updateScore();
//     };

//     // --- TỐI ƯU 2: Logic useEffect đúng đắn và an toàn hơn ---
//     useEffect(() => {
//         // Nếu đã có match từ location.state, không cần fetch lại
//         if (match && match.billiardMatchID.toString() === id) {
//             setIsLoading(false);
//             return;
//         }

//         const getMatch = async () => {
//             if (!id) {
//                 setError("Match ID is missing from URL.");
//                 setIsLoading(false);
//                 return;
//             }

//             setIsLoading(true);
//             setError(null);
//             const response = await fetchMatchAPI(id);

//             if (response.status === 200) {
//                 setMatch(response.data);
//                 toast.success(response.message);
//             } else {
//                 setError(response.message || 'Failed to fetch match details.');
//             }
//             setIsLoading(false);
//         };

//         getMatch();
//     }, [id, match]);

//     useEffect(() => {
//         if (match?.status === 'completed') {
//             setShowPopup(true);
//         }
//     }, [match]);

//     // --- TỐI ƯU 3: Xử lý các trạng thái UI trước khi render ---
//     if (isLoading) {
//         return <LoadingComponent />;
//     }

//     if (error) {
//         return <ErrorComponent message={error} />;
//     }

//     // Nếu không loading, không lỗi, nhưng vẫn không có match -> fallback
//     if (!match) {
//         return <ErrorComponent message="Could not find match data." />;
//     }

//     // --- Khi đã có dữ liệu `match`, render UI chính ---
//     return (
//         <div className="w-screen h-screen flex flex-col gap-5 text-white font-sans px-6 py-4 overflow-hidden gradient-bg">

//             {/* Header */}
//             <section className="flex-auto">
//                 {/* TỐI ƯU 4: Truyền dữ liệu động, bao gồm cả tableName (giả sử có) */}
//                 <Header
//                     setArray={match.sets}
//                 />
//             </section>

//             {/* Scoreboard */}
//             <section className="flex-1/2">
//                 {/* TỐI ƯU 4: Truyền cả mảng teams thay vì ID tĩnh */}
//                 <TableScore
//                     teamsArray={match.teams}
//                     onScoreChange={handleScoreUpdate}
//                 />
//             </section>

//             {/* Log History */}
//             <section className="flex-1/2 overflow-y-hidden">
//                 {/* TỐI ƯU 4: Component con cũng nên nhận dữ liệu động */}
//                 <BackLog />
//             </section>

//             {/* Popup End Game */}
//             <section>
//                 {showPopup && <GameResultPopup
//                     winner={match.winner || "Hòa"}
//                 />}
//             </section>
//         </div>
//     )
// }

// src/pages/Match/Match.js

import { useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useStomp } from "../../hooks/useStomp";
import { useSubscription } from "../../hooks/useSubscription";
import { type BilliardMatch } from "../../models/DataObject";
import BackLog from "./partials/BackLog";
import GameResultPopup from "./partials/GameResultPopup";
import Header from "./partials/Header";
import TableScore from "./partials/TableScore";
import { fetchMatchAPI, setManualAPI, updateScoreAPI } from "./services/FetchAPI";
import type { Loggoing } from "./models/WebSocketModel";

// --- Components Placeholder ---
const LoadingComponent = () => (
    <div className="w-screen h-screen flex justify-center items-center gradient-bg text-white text-2xl p-4 text-center">
        Loading match data...
    </div>
);

const ErrorComponent = ({ message }: { message: string }) => (
    <div className="w-screen h-screen flex justify-center items-center gradient-bg text-red-400 text-2xl p-4 text-center">
        Error: {message}
    </div>
);


export default function Match() {
    const location = useLocation();
    const { id } = useParams<{ id: string }>();
    const [showPopup, setShowPopup] = useState(false);

    const [match, setMatch] = useState<BilliardMatch | null>(location.state?.match ?? null);
    const [isLoading, setIsLoading] = useState<boolean>(!match);
    const [error, setError] = useState<string | null>(null);
    const { client, isConnected } = useStomp();

    const handleMatchUpdate = useCallback((updatedMatch: BilliardMatch) => {
        console.log('Received match update:', updatedMatch);
        setMatch(updatedMatch);
    }, []);

    const handleManualMode = async () => {
        if (match != null) {
            const response = await setManualAPI(match.billiardMatchID);
            if (response.status === 200) {
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        }
    }

    const handleNewLog = useCallback((logMessage: Loggoing) => {
        console.log('Received new log:', logMessage);
        switch (logMessage.code) {
            case "NOTIFICATION":
                toast.info(logMessage.data);
                break;
            case "ERROR":
                toast.error(logMessage.data);
                break;
            case "WARNING":
                toast("Connection Camera Failed", {
                    description: "You can select mode to manual all actions",
                    action: {
                        label: "Manual",
                        onClick: () => handleManualMode
                    }
                })
                // toast.warning(
                //     <div className="flex items-center justify-between gap-4">
                //         <span>{logMessage.data}</span>
                //         <button
                //             onClick={handleManualMode}
                //             className="px-2 py-1 text-sm bg-yellow-500 text-white rounded"
                //         >
                //             Manual
                //         </button>
                //     </div>
                // );
                break;
            case "LOGGING":
                toast.info(logMessage.data);
                break;
            default:
                console.log("❓ Unknown log code:", logMessage.code);
        }
    }, []);

    useSubscription(client, isConnected, `/topic/match/${id}`, handleMatchUpdate);
    useSubscription(client, isConnected, `/topic/log/${id}`, handleNewLog);
    useSubscription(client, isConnected, `/topic/notification`, handleNewLog);

    const handleScoreUpdate = (teamID: number, delta: string) => {
        const updateScore = async () => {
            if (match) {
                const response = await updateScoreAPI(match.billiardMatchID, teamID, delta);
                if (response.status === 200) {
                    setMatch(response.data);
                    toast.success(response.message);
                }
            } else {
                toast.error('Không tìm thấy trận đấu');
            }
        }
        updateScore();
    };

    useEffect(() => {
        if (match && match.billiardMatchID.toString() === id) {
            setIsLoading(false);
            return;
        }
        const getMatch = async () => {
            if (!id) {
                setError("Match ID is missing from URL.");
                setIsLoading(false);
                return;
            }
            setIsLoading(true);
            setError(null);
            const response = await fetchMatchAPI(id);
            if (response.status === 200) {
                setMatch(response.data);
            } else {
                setError(response.message || 'Failed to fetch match details.');
            }
            setIsLoading(false);
        };
        getMatch();
    }, [id, match]);

    useEffect(() => {
        if (match?.status === 'completed') {
            setShowPopup(true);
        }
    }, [match]);

    if (isLoading) return <LoadingComponent />;
    if (error) return <ErrorComponent message={error} />;
    if (!match) return <ErrorComponent message="Could not find match data." />;

    return (
        // THAY ĐỔI: Điều chỉnh padding cho mobile
        <div className="w-screen h-screen flex flex-col gap-2 md:gap-5 text-white font-sans p-4 md:p-6 overflow-hidden gradient-bg">

            <section className="flex-initial">
                <Header
                    setArray={match.sets}
                    tableID={`TABLE: ${match.billiardMatchID}`} // Truyền tên bàn
                />
            </section>

            <section className="flex-1 flex items-center justify-center">
                <TableScore
                    teamsArray={match.teams}
                    onScoreChange={handleScoreUpdate}
                />
            </section>

            {/* THAY ĐỔI: Ẩn BackLog trên mobile */}
            <section className="hidden md:block flex-initial overflow-y-hidden">
                <BackLog tableID={match.billiardTableID} />
            </section>

            <section>
                {showPopup &&
                    <GameResultPopup
                        playerArray={match.teams}
                        winner={match.winner || "Hòa"}
                    />}
            </section>
        </div>
    )
}