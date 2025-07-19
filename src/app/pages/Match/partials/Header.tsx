import logo from "../../../assets/Logo_shadow.svg"
import iconEdit from "../../../assets/Icon_Edit2.svg"
import { type HeaderProps } from "../models/PartialModel"
import type { GameSet } from "../../../models/DataObject";
import { toast } from "sonner";

// Thêm tableName vào Props
interface CustomHeaderProps extends HeaderProps {
    setArray: GameSet[];
    tableID: string;
}

const Header = ({ setArray, tableID }: CustomHeaderProps) => {
    const currentSet = setArray.find(set => set.status === 'ongoing')
        || setArray.find(set => set.status === 'pending');

    const totalRounds = setArray.length;
    const raceTo = setArray[0].raceTo;
    const roundDisplay = currentSet
        ? `${currentSet.gameSetNo} / ${totalRounds}`
        : `Finished`;

    const handleSetting = () => {
        toast.info('This function is coming soon!')
    }

    return (
        // THAY ĐỔI: justify-center trên mobile, justify-between trên desktop
        <div className="text-center flex justify-center md:justify-between items-center">
            {/* THAY ĐỔI: Ẩn logo trên mobile */}
            <div className="hidden md:flex flex-1/3">
                <img src={logo} alt="Logo" className="w-24 h-24 lg:w-32 lg:h-32" />
            </div>

            {/* THAY ĐỔI: Giảm kích thước chữ cho mobile */}
            <h3 className="flex-auto flex flex-col text-3xl md:text-4xl lg:text-4xl font-bold">
                <span className="text-black">{tableID.toUpperCase()}</span>
                <span className="text-white text-xl md:text-2xl lg:text-3xl">
                    ROUND : {roundDisplay}
                </span>
                <span className="text-amber-200 text-xl md:text-2xl lg:text-2xl">
                    RACE TO : {raceTo}
                </span>
            </h3>

            {/* THAY ĐỔI: Ẩn nút Setting trên mobile */}
            <div className="hidden md:flex flex-1/3 justify-end">
                <button
                    onClick={handleSetting}
                    className="flex flex-row items-center gap-3
                             cursor-pointer text-base lg:text-xl px-4 py-2 rounded-[10px]
                               font-semibold shadow hover:bg-green-700 transition"
                    style={{ backgroundColor: `var(--primary-color)` }}
                >
                    <img src={iconEdit} alt="Icon Edit" className="w-5 lg:w-6" />
                    <span className="font-bold">Cancel</span>
                </button>
            </div>
        </div>
    )
}

export default Header;
