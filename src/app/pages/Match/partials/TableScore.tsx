import type { Team } from "../../../models/DataObject";

interface TableScoreProps {
    teamsArray: Team[];
}

const TableScore = ({ teamsArray }: TableScoreProps) => {
    console.log(teamsArray);
    return (
        <div className="flex justify-around items-center px-8">
            {/* TEAM A */}
            <div className="flex-1/3 flex flex-col gap-2">
                <h3 className="text-6xl font-bold text-balance">TEAM A</h3>
                <div className="flex flex-row justify-center">
                    <h4 className="text-4xl text-amber-300 text-end font-bold flex-1/2">PLAYER 1</h4>
                    <div className="flex-1/2 flex flex-row gap-5 items-center">
                        <button className="text-5xl hover:text-amber-500 cursor-pointer">+</button>
                        <h1 className=" text-center text-[14rem] font-bold leading-none">0</h1>
                        <button className="text-5xl hover:text-amber-500 cursor-pointer">-</button>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="flex-1/3 flex justify-center">
                <div className="w-px h-[200px] bg-white opacity-60"></div>
            </div>

            {/* TEAM B */}
            <div className="flex-1/3 flex flex-col gap-2">
                <h3 className="text-6xl font-bold text-end">TEAM B</h3>
                <div className="flex flex-row justify-center">
                    <div className="flex-1/2 flex flex-row gap-5 items-center">
                        <button className="text-5xl hover:text-amber-500 cursor-pointer">+</button>
                        <h1 className=" text-center text-[14rem] font-bold leading-none">0</h1>
                        <button className="text-5xl hover:text-amber-500 cursor-pointer">-</button>
                    </div>
                    <h4 className="text-4xl text-start font-bold flex-1/2"
                        style={{ color: 'var(--primary-color)' }}
                    >
                        PLAYER 2
                    </h4>
                </div>
            </div>
        </div>
    )
}

export default TableScore
