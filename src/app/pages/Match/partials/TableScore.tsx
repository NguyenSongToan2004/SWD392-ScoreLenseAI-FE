// // ./partials/TableScore.tsx

// import type { Team } from "../../../models/DataObject";

// interface TableScoreProps {
//     teamsArray: Team[];
//     // Hàm được truyền từ component cha để xử lý việc cập nhật điểm
//     onScoreChange: (teamID: number, delta: string) => void;
// }

// // Component này giờ trở nên đơn giản hơn rất nhiều
// const TableScore = ({ teamsArray, onScoreChange }: TableScoreProps) => {

//     const teamA = teamsArray && teamsArray.length > 0 ? teamsArray[0] : null;
//     const teamB = teamsArray && teamsArray.length > 1 ? teamsArray[1] : null;

//     if (!teamA || !teamB) {
//         return <div>Loading teams...</div>;
//     }

//     // Giả sử mỗi đội chỉ có 1 người chơi trong giao diện này
//     const playerA = teamA.players[0];
//     const playerB = teamB.players[0];

//     if (!playerA || !playerB) {
//         return <div>Loading players...</div>
//     }

//     return (
//         <div className="flex justify-around items-center px-8">
//             {/* TEAM A */}
//             <div className="flex-1/3 flex flex-col gap-2">
//                 <h3 className="text-6xl font-bold text-balance">{teamA.name}</h3>
//                 <div className="flex flex-row justify-center">
//                     <h4 className="text-4xl text-amber-300 text-end font-bold flex-1/2">{playerA.name}</h4>
//                     <div className="flex-1/2 flex flex-row gap-5 items-center">
//                         <button
//                             onClick={() => onScoreChange(teamA.teamID, '+1')}
//                             className="text-5xl hover:text-amber-500 cursor-pointer"
//                         >
//                             +
//                         </button>
//                         <h1 className=" text-center text-[14rem] font-bold leading-none">{teamA.totalScore}</h1>
//                         <button
//                             onClick={() => onScoreChange(teamA.teamID, '-1')}
//                             className="text-5xl hover:text-amber-500 cursor-pointer"
//                         >
//                             -
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Divider */}
//             <div className="flex-1/3 flex justify-center">
//                 <div className="w-px h-[200px] bg-white opacity-60"></div>
//             </div>

//             {/* TEAM B */}
//             <div className="flex-1/3 flex flex-col gap-2">
//                 <h3 className="text-6xl font-bold text-end">{teamB.name}</h3>
//                 <div className="flex flex-row justify-center">
//                     <div className="flex-1/2 flex flex-row gap-5 items-center">
//                         <button
//                             onClick={() => onScoreChange(teamB.teamID, '+1')}
//                             className="text-5xl hover:text-amber-500 cursor-pointer"
//                         >
//                             +
//                         </button>
//                         <h1 className=" text-center text-[14rem] font-bold leading-none">{teamB.totalScore}</h1>
//                         <button
//                             onClick={() => onScoreChange(teamB.teamID, '-1')}
//                             className="text-5xl hover:text-amber-500 cursor-pointer"
//                         >
//                             -
//                         </button>
//                     </div>
//                     <h4 className="text-4xl text-start font-bold flex-1/2"
//                         style={{ color: 'var(--primary-color)' }}
//                     >
//                         {playerB.name}
//                     </h4>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default TableScore;

// src/pages/Match/partials/TableScore.js

// import type { Team } from "../../../models/DataObject";

// interface TableScoreProps {
//     teamsArray: Team[];
//     onScoreChange: (teamID: number, delta: string) => void;
// }

// const TableScore = ({ teamsArray, onScoreChange }: TableScoreProps) => {

//     const teamA = teamsArray?.[0];
//     const teamB = teamsArray?.[1];

//     if (!teamA || !teamB) {
//         return <div>Loading teams...</div>;
//     }

//     const playerA = teamA.players[0];
//     const playerB = teamB.players[0];

//     if (!playerA || !playerB) {
//         return <div>Loading players...</div>
//     }

//     return (
//         // THAY ĐỔI: flex-col trên mobile, md:flex-row trên desktop
//         <div className="w-full flex flex-col md:flex-row justify-around items-center px-0 md:px-8">
//             {/* TEAM A */}
//             <div className="w-full md:flex-1/3 flex flex-col items-center gap-2">
//                 {/* THAY ĐỔI: Giảm font-size và căn giữa cho mobile */}
//                 <h3 className="text-4xl text-black md:text-5xl lg:text-6xl font-bold text-center">{teamA.name}</h3>
//                 <h4 className="hidden md:block text-2xl lg:text-4xl text-amber-300 font-bold">{playerA.name}</h4>
//                 <div className="flex flex-row gap-10 md:gap-5 items-center">
//                     <button
//                         onClick={() => onScoreChange(teamA.teamID, '+1')}
//                         className="text-4xl md:text-5xl hover:text-amber-500 cursor-pointer"
//                     >
//                         <strong>+</strong>
//                     </button>
//                     {/* THAY ĐỔI: Giảm font-size cho mobile */}
//                     <h1 className="text-center text-[8rem] md:text-[10rem] lg:text-[14rem] font-bold leading-none">{teamA.totalScore}</h1>
//                     <button
//                         onClick={() => onScoreChange(teamA.teamID, '-1')}
//                         className="text-4xl md:text-5xl hover:text-amber-500 cursor-pointer"
//                     >
//                         <strong>-</strong>
//                     </button>
//                 </div>
//             </div>

//             {/* Divider */}
//             {/* THAY ĐỔI: Hiển thị thanh ngang trên mobile, thanh dọc trên desktop */}
//             <div className="w-3/4 h-px bg-white opacity-60 my-4 md:hidden"></div>
//             <div className="hidden md:flex flex-1/3 justify-center">
//                 <div className="w-px h-[200px] bg-white opacity-60"></div>
//             </div>

//             {/* TEAM B */}
//             <div className="w-full md:flex-1/3 flex flex-col items-center gap-2">
//                 <h3 className="text-4xl text-black md:text-5xl lg:text-6xl font-bold text-center">{teamB.name}</h3>
//                 <h4
//                     className="hidden md:block text-2xl lg:text-4xl font-bold"
//                     style={{ color: 'var(--primary-color)' }}
//                 >
//                     {playerB.name}
//                 </h4>
//                 <div className="flex flex-row gap-10 md:gap-5 items-center">
//                     <button
//                         onClick={() => onScoreChange(teamB.teamID, '+1')}
//                         className="text-4xl md:text-5xl hover:text-amber-500 cursor-pointer"
//                     >
//                         <strong>+</strong>
//                     </button>
//                     <h1 className="text-center text-[8rem] md:text-[10rem] lg:text-[14rem] font-bold leading-none">{teamB.totalScore}</h1>
//                     <button
//                         onClick={() => onScoreChange(teamB.teamID, '-1')}
//                         className="text-4xl md:text-5xl hover:text-amber-500 cursor-pointer"
//                     >
//                         <strong>-</strong>
//                     </button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default TableScore;
import type { Team } from "../../../models/DataObject";

interface TableScoreProps {
    teamsArray: Team[];
    onScoreChange: (teamID: number, delta: string) => void;
}

const TableScore = ({ teamsArray, onScoreChange }: TableScoreProps) => {

    const teamA = teamsArray?.[0];
    const teamB = teamsArray?.[1];

    if (!teamA || !teamB) {
        return <div>Loading teams...</div>;
    }

    const playerA = teamA.players[0];
    const playerB = teamB.players[0];

    if (!playerA || !playerB) {
        return <div>Loading players...</div>
    }

    return (
        <div className="w-full flex flex-col md:flex-row justify-around items-center px-0 md:px-8">
            {/* --- TEAM A --- */}
            <div className="w-full md:basis-1/3 flex flex-col gap-2">
                {/* Tên đội: Căn giữa trên mobile, căn trái trên desktop */}
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center md:text-left">{teamA.name}</h3>

                {/* Container cho Tên người chơi và Điểm */}
                <div className="flex flex-col md:flex-row items-center">
                    {/* Tên người chơi A: Ẩn trên mobile, hiển thị và căn phải trên desktop */}
                    <h4 className="hidden md:flex md:basis-1/2 md:self-start items-center justify-end pr-4 text-2xl lg:text-4xl text-amber-300 font-bold">
                        {playerA.name}
                    </h4>
                    {/* Bảng điểm A */}
                    <div className="flex flex-row gap-10 md:gap-5 items-center md:basis-1/2">
                        <button
                            onClick={() => onScoreChange(teamA.teamID, '+1')}
                            className="text-4xl md:text-5xl hover:text-amber-500 cursor-pointer font-bold"
                        >
                            +
                        </button>
                        <h1 className="text-center text-[8rem] md:text-[10rem] lg:text-[14rem] font-bold leading-none">{teamA.totalScore}</h1>
                        <button
                            onClick={() => onScoreChange(teamA.teamID, '-1')}
                            className="text-4xl md:text-5xl hover:text-amber-500 cursor-pointer font-bold"
                        >
                            -
                        </button>
                    </div>
                </div>
            </div>

            {/* --- Divider --- */}
            <div className="w-3/4 h-px bg-white opacity-60 my-4 md:hidden" />
            <div className="hidden md:flex justify-center md:basis-1/3">
                <div className="w-px h-[200px] bg-white opacity-60"></div>
            </div>

            {/* --- TEAM B --- */}
            <div className="w-full md:basis-1/3 flex flex-col gap-2">
                {/* Tên đội: Căn giữa trên mobile, căn phải trên desktop */}
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center md:text-right">{teamB.name}</h3>

                {/* Container cho Tên người chơi và Điểm */}
                <div className="flex flex-col md:flex-row items-center">
                    {/* Bảng điểm B */}
                    <div className="flex flex-row gap-10 md:gap-5 items-center md:basis-1/2">
                        <button
                            onClick={() => onScoreChange(teamB.teamID, '+1')}
                            className="text-4xl md:text-5xl hover:text-amber-500 cursor-pointer font-bold"
                        >
                            +
                        </button>
                        <h1 className="text-center text-[8rem] md:text-[10rem] lg:text-[14rem] font-bold leading-none">{teamB.totalScore}</h1>
                        <button
                            onClick={() => onScoreChange(teamB.teamID, '-1')}
                            className="text-4xl md:text-5xl hover:text-amber-500 cursor-pointer font-bold"
                        >
                            -
                        </button>
                    </div>
                    {/* Tên người chơi B: Ẩn trên mobile, hiển thị và căn trái trên desktop */}
                    <h4
                        className="hidden md:flex md:basis-1/2 md:self-start items-center justify-start pl-4 text-2xl lg:text-4xl font-bold"
                        style={{ color: 'var(--primary-color)' }}
                    >
                        {playerB.name}
                    </h4>
                </div>
            </div>
        </div>
    )
}

export default TableScore;