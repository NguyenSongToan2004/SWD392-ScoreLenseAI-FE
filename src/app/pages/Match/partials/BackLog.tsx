
const BackLog = () => {
    return (
        <div className="w-full flex justify-center">
            <div className="rounded-md w-[600px] p-3 bg-[#d2dfb9] max-h-[200px]">
                <div className="text-black max-h-[100%] pr-2 overflow-y-scroll scroll-auto">
                    {[
                        { time: "18:58", shot: "#27", color: "text-green-700", player: "PLAYER 1", result: "SCORED" },
                        { time: "19:00", shot: "#28", color: "text-red-600", player: "PLAYER 2", result: "MISSED" },
                        { time: "19:04", shot: "#29", color: "text-red-600", player: "PLAYER 1", result: "MISSED" },
                        { time: "19:10", shot: "#30", color: "text-green-700", player: "PLAYER 2", result: "SCORED" },
                        { time: "19:15", shot: "#31", color: "text-red-600", player: "PLAYER 1", result: "MISSED" },
                        { time: "19:18", shot: "#32", color: "text-green-700", player: "PLAYER 2", result: "SCORED" },
                        { time: "19:20", shot: "#33", color: "text-green-700", player: "PLAYER 1", result: "SCORED" },
                        // thêm bao nhiêu dòng cũng được
                        { time: "19:20", shot: "#33", color: "text-green-700", player: "PLAYER 1", result: "SCORED" },
                        { time: "19:20", shot: "#33", color: "text-green-700", player: "PLAYER 1", result: "SCORED" },

                    ].map((entry, index) => (
                        <div key={index} className="flex justify-between py-1 text-md font-semibold">
                            <div className="flex gap-2 w-1/2">
                                <span>{entry.time}</span>
                                <span className={entry.color}>SHOT {entry.shot}</span>
                            </div>
                            <div className="flex gap-4 w-2/3 justify-end text-left">
                                <span className="text-left">{entry.player}</span>
                                <span
                                    className="text-red-600"
                                    style={entry.result === "MISSED" ? {} : { color: 'var(--primary-color)' }}
                                >
                                    {entry.result}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BackLog
