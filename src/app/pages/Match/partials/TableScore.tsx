
const TableScore = () => {
    return (
        <div className="flex justify-around items-center px-8">
            {/* TEAM A */}
            <div className="flex-1/3 flex flex-col gap-2">
                <h3 className="text-6xl font-bold text-balance">TEAM A</h3>
                <div className="flex flex-row justify-center">
                    <h4 className="text-4xl text-amber-300 text-end font-bold flex-1/2">PLAYER 1</h4>
                    <h1 className=" text-center text-[14rem] font-bold leading-none flex-1/2">0</h1>
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
                    <h1 className="text-center text-[14rem] font-bold leading-none flex-1/2">1</h1>
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
