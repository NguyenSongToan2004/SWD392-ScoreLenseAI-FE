import { toast } from "sonner";
import type { Team } from "../../../models/DataObject";
import { cancelMatchAPI } from "../services/FetchAPI";

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

    const handleCancel = (matchID: number, forfeitTeamID: number) => {
        const confirmed = window.confirm("Are you sure you want to cancel this match?");
        if (confirmed) {
            console.log("Match cancelled");

            const updateMatch = async () => {
                const response = await cancelMatchAPI(matchID, forfeitTeamID, "cancel");

                if (response.status === 200) {
                    toast.message(response.message);
                } else {
                    toast.error(response.message);
                }
            }

            updateMatch();
        }
    };

    if (!playerA || !playerB) {
        return <div>Loading players...</div>
    }

    return (
        <div className="w-full flex flex-col md:flex-row justify-around items-center px-0 md:px-8">
            {/* --- TEAM A --- */}
            <div className="w-full md:basis-1/3 flex flex-col gap-2">
                {/* Tên đội: Căn giữa trên mobile, căn trái trên desktop */}
                <div className="flex flex-row justify-center md:justify-start items-center gap-4">
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center md:text-left">{teamA.name}</h3>
                    <button
                        className="w-8 h-8 cursor-pointer bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-200 shadow-sm"
                        onClick={() => handleCancel(teamA.billiardMatchID, teamA.teamID)}
                    >
                        {/* <img src={iconEdit} alt="Cancel" className="w-4 h-4" /> */}
                        <strong>X</strong>
                    </button>
                </div>

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
                <div className="flex flex-row justify-center md:justify-end items-center gap-4 ">
                    <button
                        className="w-8 h-8 cursor-pointer bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-200 shadow-sm"
                        onClick={() => handleCancel(teamB.billiardMatchID, teamB.teamID)}
                    >
                        {/* <img src={iconEdit} alt="Cancel" className="w-4 h-4" /> */}
                        <strong>X</strong>
                    </button>
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center md:text-right">{teamB.name}</h3>
                </div>
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
