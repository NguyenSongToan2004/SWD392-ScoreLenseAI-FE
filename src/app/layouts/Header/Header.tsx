import { useLocation, useNavigate } from "react-router-dom"
import logoutIcon from "../../assets/AiOutlineLogout.svg"
import userCircleIcon from "../../assets/FaUserCircle.svg"
import logo from "../../assets/ScoreLens-Logo.png"
import storeIcon from "../../assets/storeIcon.png"
import type { Store, User } from "../../models/DataObject"
import { useEffect, useState } from "react"
import { fetchCustomerInfoAPI } from "./FetchAPI"
import { toast } from "sonner"
import { logoutAPI } from "../../pages/Home/services/FetchAPI"
const Header = () => {
    const loc = useLocation();
    const nav = useNavigate();
    const [userInfo, setUserInfo] = useState<User | undefined>(loc.state?.userInfo as User | undefined)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const storeInfo: Store | undefined = userInfo?.store;
    const role = localStorage.getItem('role');

    useEffect(() => {
        if (!userInfo) {
            if (role === "CUSTOMER") {
                // fetch API get profile for customer
                const fetchUserInfo = async () => {
                    const response = await fetchCustomerInfoAPI();
                    if (response.status === 200)
                        setUserInfo(response.data as User);
                }
                fetchUserInfo();
            } else {
                // fetch API get profile for staff
            }
        }
    }, [userInfo])



    const moveUser = () => {
        nav("/login");
    }

    const logout = () => {
        localStorage.removeItem('isAuth');
        localStorage.removeItem('userID');
        localStorage.removeItem('staffID');
        localStorage.removeItem('role');
        localStorage.removeItem('customerName');
        const logOut = async () => {
            const response = await logoutAPI();
            if (response.status === 200)
                toast.success(response.message);
            else
                toast.error(response.message);
        }
        logOut();
        nav("/login")
    }

    return (
        <div className="bg-white flex border-b border-gray-300 
            flex-row justify-between px-5 py-2 items-center 
            shadow-xl z-20 max-h-[100px]">
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
                {
                    // 3. Hiển thị thông tin cửa hàng có điều kiện
                    // Chỉ hiển thị khối này nếu storeInfo thực sự tồn tại (không phải undefined)
                    storeInfo ?
                        <div className="flex flex-row gap-2 items-center bg-orange-100 p-2 rounded-xl">
                            <img src={storeIcon} alt="Store Icon" className="w-6 h-auto" />
                            <h4 className="text-black text-md font-medium text-xl">{storeInfo.name}</h4>
                        </div>
                        : null // Không hiển thị gì nếu không có storeInfo
                }
                <div
                    onClick={() => setIsSidebarOpen(true)}
                    className="flex flex-row gap-2 items-center bg-green-100 p-2 rounded-xl cursor-pointer hover:bg-green-200 transition"
                >
                    <img src={userCircleIcon} alt="User Icon" className="w-6 h-auto" />
                    <h4 className="text-black text-md font-medium text-xl">{userInfo?.name}</h4>
                </div>
                <div className="w-px h-11 bg-gray-400 mx-2"></div>
                <button onClick={logout} className="cursor-pointer">
                    <img src={logoutIcon} alt="Logout Icon" className="w-8 h-auto" />
                </button>
            </div>
            {isSidebarOpen && (
                <div className="fixed top-0 right-0 w-[350px] h-full bg-white shadow-xl z-50 border-l border-gray-200">
                    {/* Header */}
                    <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-b border-gray-200">
                        <h2 className="text-2xl font-semibold text-gray-800">Thông tin chi tiết</h2>
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="text-gray-500 hover:text-red-600 transition-colors duration-200"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                        <div className="space-y-5">
                            {/* Mỗi mục thông tin */}
                            <div className="pb-3 border-b border-gray-200">
                                <p className="text-sm text-gray-500">Tên người dùng</p>
                                <p className="text-lg font-medium text-gray-900">{userInfo?.name || 'Chưa cập nhật'}</p>
                            </div>

                            <div className="pb-3 border-b border-gray-200">
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="text-lg font-medium text-gray-900">{userInfo?.email || 'Chưa cập nhật'}</p>
                            </div>

                            <div className="pb-3 border-b border-gray-200">
                                <p className="text-sm text-gray-500">Số điện thoại</p>
                                <p className="text-lg font-medium text-gray-900">{userInfo?.phoneNumber || 'Chưa cập nhật'}</p>
                            </div>

                            <div className="pb-3 border-b border-gray-200">
                                <p className="text-sm text-gray-500">Ngày sinh</p>
                                <p className="text-lg font-medium text-gray-900">{userInfo?.dob || 'Chưa cập nhật'}</p>
                            </div>

                            <div className="pb-3 border-b border-gray-200">
                                <p className="text-sm text-gray-500">Địa chỉ</p>
                                <p className="text-lg font-medium text-gray-900">{userInfo?.address || 'Chưa cập nhật'}</p>
                            </div>

                            <div className="pb-3 border-b border-gray-200">
                                <p className="text-sm text-gray-500">Vai trò</p>
                                <p className="text-lg font-medium text-gray-900">{userInfo?.roles?.map(r => r.name).join(", ") || 'Chưa có vai trò'}</p>
                            </div>

                            <div> {/* Mục cuối không cần border-b */}
                                <p className="text-sm text-gray-500">Trạng thái</p>
                                <p className="text-lg font-medium text-gray-900">{userInfo?.status || 'Không xác định'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Header
