
// import { useEffect, useState } from "react";
// import { useLocation, useParams } from "react-router-dom";
// import { type BilliardMatch } from "../../models/DataObject";
// import "./home.css";
// import BackLog from "./partials/BackLog";
// import GameResultPopup from "./partials/GameResultPopup";
// import Header from "./partials/Header";
// import TableScore from "./partials/TableScore";
// import { fetchMatchAPI } from "./services/FetchAPI";
// export default function Match() {
//     const location = useLocation();
//     const { id } = useParams();
//     const [showPopup, setShowPopup] = useState(false);
//     const [match, setMatch] = useState<BilliardMatch | null>(location.state.match ?? null);

//     useEffect(() => {
//         if (!match) {
//             const getMatch = async () => {
//                 const response = await fetchMatchAPI(id as string);
//                 if (response.status === 200) {
//                     setMatch(response.data);
//                 }
//             }
//         }
//     }, [match]);

//     return (
//         <div className="w-screen h-screen flex flex-col gap-5 text-white font-sans px-6 py-4 overflow-hidden gradient-bg">

//             {/* Header */}
//             <section className="flex-auto">
//                 <Header setArray={match.sets} />
//             </section>

//             {/* Scoreboard */}
//             <section className="flex-1/2">
//                 <TableScore teamID={0} />
//             </section>

//             {/* Log History */}
//             <section className="flex-1/2 overflow-y-hidden">
//                 <BackLog />
//             </section>

//             {/*Popup End Game */}
//             <section>
//                 {showPopup && <GameResultPopup
//                     winner={"tui nè"}
//                 />}
//             </section>
//         </div>
//     )
// }

import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { type BilliardMatch } from "../../models/DataObject";
import "./home.css";
import BackLog from "./partials/BackLog";
import Header from "./partials/Header";
import TableScore from "./partials/TableScore";
import { fetchMatchAPI } from "./services/FetchAPI";

// --- TỐI ƯU: Tạo các component placeholder để xử lý UI ---
const LoadingComponent = () => (
    <div className="w-screen h-screen flex justify-center items-center gradient-bg text-white text-2xl">
        Loading match data...
    </div>
);

const ErrorComponent = ({ message }: { message: string }) => (
    <div className="w-screen h-screen flex justify-center items-center gradient-bg text-red-400 text-2xl">
        Error: {message}
    </div>
);


export default function Match() {
    const location = useLocation();
    const { id } = useParams<{ id: string }>();

    // --- TỐI ƯU 1: Thêm state cho loading và error ---
    const [match, setMatch] = useState<BilliardMatch | null>(location.state?.match ?? null);
    const [isLoading, setIsLoading] = useState<boolean>(!match); // Nếu không có match ban đầu, đặt là đang loading
    const [error, setError] = useState<string | null>(null);
    // const [showPopup, setShowPopup] = useState(false);

    // --- TỐI ƯU 2: Logic useEffect đúng đắn và an toàn hơn ---
    useEffect(() => {
        // Nếu đã có match từ location.state, không cần fetch lại
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
    }, [id, match]); // Phụ thuộc vào `id` để fetch lại khi URL thay đổi

    // --- TỐI ƯU 3: Xử lý các trạng thái UI trước khi render ---
    if (isLoading) {
        return <LoadingComponent />;
    }

    if (error) {
        return <ErrorComponent message={error} />;
    }

    // Nếu không loading, không lỗi, nhưng vẫn không có match -> fallback
    if (!match) {
        return <ErrorComponent message="Could not find match data." />;
    }

    // --- Khi đã có dữ liệu `match`, render UI chính ---
    return (
        <div className="w-screen h-screen flex flex-col gap-5 text-white font-sans px-6 py-4 overflow-hidden gradient-bg">

            {/* Header */}
            <section className="flex-auto">
                {/* TỐI ƯU 4: Truyền dữ liệu động, bao gồm cả tableName (giả sử có) */}
                <Header
                    setArray={match.sets}
                />
            </section>

            {/* Scoreboard */}
            <section className="flex-1/2">
                {/* TỐI ƯU 4: Truyền cả mảng teams thay vì ID tĩnh */}
                <TableScore teamsArray={match.teams} />
            </section>

            {/* Log History */}
            <section className="flex-1/2 overflow-y-hidden">
                {/* TỐI ƯU 4: Component con cũng nên nhận dữ liệu động */}
                <BackLog />
            </section>

            {/* Popup End Game */}
            <section>
                {/* TỐI ƯU 4: Lấy winner từ dữ liệu match */}
                {/* {showPopup && <GameResultPopup
                    winner={match.winner || "Hòa"}
                />} */}
            </section>
        </div>
    )
}