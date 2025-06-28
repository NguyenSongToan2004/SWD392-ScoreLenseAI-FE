// ./partials/TableScore.tsx

import type { Team } from "../../../models/DataObject";

interface TableScoreProps {
    teamsArray: Team[];
    // Hàm được truyền từ component cha để xử lý việc cập nhật điểm
    onScoreChange: (teamID: number, delta: string) => void;
}

// Component này giờ trở nên đơn giản hơn rất nhiều
const TableScore = ({ teamsArray, onScoreChange }: TableScoreProps) => {
    
    const teamA = teamsArray && teamsArray.length > 0 ? teamsArray[0] : null;
    const teamB = teamsArray && teamsArray.length > 1 ? teamsArray[1] : null;

    if (!teamA || !teamB) {
        return <div>Loading teams...</div>;
    }

    // Giả sử mỗi đội chỉ có 1 người chơi trong giao diện này
    const playerA = teamA.players[0];
    const playerB = teamB.players[0];

    if (!playerA || !playerB) {
        return <div>Loading players...</div>
    }

    return (
        <div className="flex justify-around items-center px-8">
            {/* TEAM A */}
            <div className="flex-1/3 flex flex-col gap-2">
                <h3 className="text-6xl font-bold text-balance">{teamA.name}</h3>
                <div className="flex flex-row justify-center">
                    <h4 className="text-4xl text-amber-300 text-end font-bold flex-1/2">{playerA.name}</h4>
                    <div className="flex-1/2 flex flex-row gap-5 items-center">
                        <button
                            onClick={() => onScoreChange(teamA.teamID, '+1')}
                            className="text-5xl hover:text-amber-500 cursor-pointer"
                        >
                            +
                        </button>
                        <h1 className=" text-center text-[14rem] font-bold leading-none">{teamA.totalScore}</h1>
                        <button
                            onClick={() => onScoreChange(teamA.teamID, '-1')}
                            className="text-5xl hover:text-amber-500 cursor-pointer"
                        >
                            -
                        </button>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="flex-1/3 flex justify-center">
                <div className="w-px h-[200px] bg-white opacity-60"></div>
            </div>

            {/* TEAM B */}
            <div className="flex-1/3 flex flex-col gap-2">
                <h3 className="text-6xl font-bold text-end">{teamB.name}</h3>
                <div className="flex flex-row justify-center">
                    <div className="flex-1/2 flex flex-row gap-5 items-center">
                        <button
                            onClick={() => onScoreChange(teamB.teamID, '+1')}
                            className="text-5xl hover:text-amber-500 cursor-pointer"
                        >
                            +
                        </button>
                        <h1 className=" text-center text-[14rem] font-bold leading-none">{teamB.totalScore}</h1>
                        <button
                            onClick={() => onScoreChange(teamB.teamID, '-1')}
                            className="text-5xl hover:text-amber-500 cursor-pointer"
                        >
                            -
                        </button>
                    </div>
                    <h4 className="text-4xl text-start font-bold flex-1/2"
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