// src/pages/admin/partials/SideBar.tsx

import { NavLink, useLocation } from "react-router-dom"; // 1. Import thêm useLocation
import infoIcon from "../../../assets/AiOutlineInfoCircle.svg"
import trophyIcon from "../../../assets/BiTrophy.svg";

const SideBar = () => {
    // 2. Lấy thông tin về location hiện tại
    const loc = useLocation();

    // Helper class cho NavLink để code gọn hơn
    const navLinkClasses = "flex items-center px-4 py-3 text-gray-300 hover:bg-slate-700 hover:text-white rounded-lg transition-colors duration-200";
    const activeNavLinkClasses = "bg-slate-900 text-white";

    return (
        <aside className="w-64 bg-slate-800 p-4 font-semibold">
            <nav>
                <ul>
                    <li className="mb-2 text-white">
                        <NavLink
                            to="/admin/dashboard"
                            // 3. Truyền state hiện tại vào NavLink
                            state={loc.state}
                            className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}
                        >
                            <img src={trophyIcon} alt="Trophy Icon" className="mr-3" />
                            DASHBOARD
                        </NavLink>
                    </li>
                    <li className="mb-2 text-white">
                        <NavLink
                            to="/admin/table"
                            // 3. Truyền state hiện tại vào NavLink
                            state={loc.state}
                            className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}
                        >
                            <img src={infoIcon} alt="Table Info Icon" className="mr-3" />
                            TABLE DETAILS
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default SideBar;