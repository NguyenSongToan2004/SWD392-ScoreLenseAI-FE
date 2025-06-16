import logo from "../../assets/ScoreLens-Logo.png"
import userCircleIcon from "../../assets/FaUserCircle.svg"
import logoutIcon from "../../assets/AiOutlineLogout.svg"
import { useNavigate } from "react-router-dom"
const Header = () => {
    const nav = useNavigate();
    const moveUser = () => {
        nav("/");
    }
    return (
        <div className="bg-white flex border-b border-gray-300 
            flex-row justify-between px-5 py-2 items-center 
            shadow-xl z-10 max-h-[100px]">
            {/*Logo and Name */}
            <button
                onClick={moveUser}
                className="flex flex-row items-center cursor-pointer">
                <img src={logo} alt="logo" className="w-20 h-auto" />
                <h3
                    className="text-4xl"
                    style={{ color: `var(--primary-color)` }}
                >
                    SCORE LENS
                </h3>
            </button>

            {/*User info*/}
            <div className="flex flex-row gap-1 items-center">
                <div className="flex flex-row gap-2 items-center bg-green-100 p-2 rounded-xl">
                    <img src={userCircleIcon} alt="User Icon" className="w-6 h-auto" />
                    <h4 className="text-black text-md font-medium text-xl">DEV TEST</h4>
                </div>
                <div className="w-px h-11 bg-gray-400 mx-2"></div>
                <button onClick={moveUser} className="cursor-pointer">
                    <img src={logoutIcon} alt="Logout Icon" className="w-8 h-auto" />
                </button>
            </div>
        </div>
    )
}

export default Header
