
import logo from "../../../assets/ScoreLens-Logo.png"
import iconEdit from "../../../assets/Icon_Edit2.svg"
import { type HeaderProps } from "../models/PartialModel"


const Header = ({ codeMatch }: HeaderProps) => {
    return (
        <div className="text-center flex justify-between items-center">
            <div className="flex-1/3">
                <img src={logo} alt="Logo" className="w-32 h-32" />
            </div>
            <h3 className="flex-auto text-3xl font-bold">
                <span className="text-amber-300">CODE: </span>
                <span className="text-white text-4xl">{codeMatch}</span>
            </h3>
            <div className="flex-1/3 flex justify-end">
                <button className="flex flex-row items-center gap-3
                         bg-green-600 cursor-pointer text-1xl px-4 py-2 rounded-[10px]
                          font-semibold shadow hover:bg-green-700 transition">
                    <img src={iconEdit} alt="Icon Edit" className="w-6" />
                    <span className="font-bold">EDIT POINT</span>
                </button>
            </div>
        </div>
    )
}

export default Header
