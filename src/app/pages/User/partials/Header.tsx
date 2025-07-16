import logo from "../../../assets/ScoreLens-Logo.png"
import userCircleIcon from "../../../assets/FaUserCircle.svg"
import logoutIcon from "../../../assets/AiOutlineLogout.svg"
import { useLocation, useNavigate } from "react-router-dom"
import { logoutAPI } from "../../Home/services/FetchAPI"
import { toast } from "sonner"

const Header = () => {
    const nav = useNavigate();
    const loc = useLocation();
    const userInfo = loc.state?.userInfo;

    const handleLogout = async () => {
        localStorage.removeItem('isAuth');
        localStorage.removeItem('userID');
        localStorage.removeItem('staffID');
        localStorage.removeItem('role');
        localStorage.removeItem('customerName');

        try {
            const response = await logoutAPI();
            if (response.status === 200) {
                toast.success(response.message || "Logged out successfully!");
            } else {
                toast.error(response.message || "An error occurred during logout.");
            }
        } catch (error) {
            toast.error("Could not connect to the server to log out.");
        } finally {
            nav("/login");
        }
    };

    return (
        <div className="flex flex-row justify-between px-5 py-2 items-center shadow-xl">
            {/*Logo and Name */}
            <div className="flex flex-row items-center">
                <img src={logo} alt="logo" className="w-22 h-auto" />
                <h3
                    className="text-5xl"
                    style={{ color: `var(--primary-color)` }}
                >
                    SCORE LENS
                </h3>
            </div>

            {/*User info*/}
            <div className="flex flex-row gap-1 items-center">
                <div className="flex flex-row gap-2 items-center bg-green-100 p-2 rounded-2xl">
                    <img src={userCircleIcon} alt="User Icon" className="w-8 h-auto" />
                    <h4 className="text-black text-md font-medium text-2xl">
                        {userInfo?.name || "DEV TEST"}
                    </h4>
                </div>
                <div className="w-px h-12 bg-gray-400 mx-2"></div>
                <button onClick={handleLogout} className="cursor-pointer">
                    <img src={logoutIcon} alt="Logout Icon" className="w-10 h-auto" />
                </button>
            </div>
        </div>
    )
}

export default Header
