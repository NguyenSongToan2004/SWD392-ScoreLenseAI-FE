// src/pages/admin/partials/SideBar.tsx

import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom"; // 1. Import thêm useLocation
import infoIcon from "../../../assets/AiOutlineInfoCircle.svg";
import trophyIcon from "../../../assets/BiTrophy.svg";
import storeIcon from "../../../assets/storeIcon.png";
import tableIcon from "../../../assets/TableIcon.svg";
import editIcon from "../../../assets/BiEditAlt_Green.svg";
import userIcon from "../../../assets/FaUserCircle.svg";
import modeIcon from "../../../assets/CurrentPlayIcon.svg";
import permissionIcon from "../../../assets/BiLogInCircle.svg";

const SideBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const loc = useLocation();

    const navLinkClasses = "flex items-center px-4 py-3 text-gray-300 hover:bg-slate-700 hover:text-white rounded-lg transition-colors duration-200";
    const activeNavLinkClasses = "bg-slate-900 text-white";

    return (
        <aside className="w-64 bg-slate-800 p-4 font-semibold">
            <nav>
                <ul>
                    <li className="mb-2 text-white">
                        <NavLink
                            to="/admin/dashboard"
                            state={{ userInfo: loc.state?.userInfo }}
                            className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}
                        >
                            <img src={trophyIcon} alt="Trophy Icon" className="mr-3" />
                            DASHBOARD
                        </NavLink>
                    </li>
                    <li className="mb-2 text-white">
                        <NavLink
                            to="/admin/table"
                            state={{ userInfo: loc.state?.userInfo }}
                            className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}
                        >
                            <img src={infoIcon} alt="Table Info Icon" className="mr-3" />
                            TABLE DETAILS
                        </NavLink>
                    </li>

                    {/* <li className="mb-2 text-white">
                        <NavLink
                            to="/admin/table-management"
                            state={{ userInfo: loc.state?.userInfo }}
                            className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}
                        >
                            <img src={infoIcon} alt="Table Management Icon" className="mr-3" />
                            TABLE MANAGEMENT
                        </NavLink>
                    </li> */}

                    <li className="mb-2 text-white">
                        {/* Nút để bật/tắt dropdown */}
                        <button
                            type="button"
                            className={`${navLinkClasses} w-full`}
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <span className="flex-1 text-left whitespace-nowrap">MANAGEMENT</span>
                            {/* Icon mũi tên chỉ xuống */}
                            <svg
                                className={`w-6 h-6 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </button>

                        {/* Nội dung dropdown, chỉ hiển thị khi isOpen là true */}
                        {isOpen && (
                            <ul className="pl-4 mt-2">
                                <li className="mb-2 border-l-1">
                                    <NavLink
                                        to="/admin/store-management"
                                        state={{ userInfo: loc.state?.userInfo }}
                                        className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}
                                    >
                                        <img src={storeIcon} alt="Store Management Icon" className="mr-3 w-6 h-6" />
                                        Store
                                    </NavLink>
                                </li>
                                <li className="mb-2 border-l-1">
                                    <NavLink
                                        to="/admin/table-management"
                                        state={{ userInfo: loc.state?.userInfo }}
                                        className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}
                                    >
                                        <img src={tableIcon} alt="Table Management Icon" className="mr-3 w-6 h-6" />
                                        Table
                                    </NavLink>
                                </li>
                                <li className="mb-2 border-l-1">
                                    <NavLink
                                        to="/admin/mode-management"
                                        state={{ userInfo: loc.state?.userInfo }}
                                        className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}
                                    >
                                        <img src={modeIcon} alt="Mode Management Icon" className="mr-3 w-6 h-6" />
                                        Mode
                                    </NavLink>
                                </li>
                                <li className="mb-2 border-l-1">
                                    <NavLink
                                        to="/admin/staff-management"
                                        state={{ userInfo: loc.state?.userInfo }}
                                        className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}
                                    >
                                        <img src={userIcon} alt="Staff Management Icon" className="mr-3 w-6 h-6" />
                                        Staff
                                    </NavLink>
                                </li>

                                <li className="mb-2 border-l-1">
                                    <NavLink
                                        to="/admin/customer-management"
                                        state={{ userInfo: loc.state?.userInfo }}
                                        className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}
                                    >
                                        <img src={userIcon} alt="Customer Management Icon" className="mr-3 w-6 h-6" />
                                        Customer
                                    </NavLink>
                                </li>

                                <li className="mb-2 border-l-1">
                                    <NavLink
                                        to="/admin/permission-management"
                                        state={{ userInfo: loc.state?.userInfo }}
                                        className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}
                                    >
                                        <img src={permissionIcon} alt="Permission Management Icon" className="mr-3 w-6 h-6" />
                                        Permission
                                    </NavLink>
                                </li>

                                <li className="mb-2 border-l-1">
                                    <NavLink
                                        to="/admin/role-management"
                                        state={{ userInfo: loc.state?.userInfo }}
                                        className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}
                                    >
                                        <img src={editIcon} alt="Role Management Icon" className="mr-3 w-6 h-6" />
                                        Role
                                    </NavLink>
                                </li>

                            </ul>
                        )}
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default SideBar;
