// // import { useLocation, useNavigate } from "react-router-dom"
// // import logoutIcon from "../../assets/AiOutlineLogout.svg"
// // import userCircleIcon from "../../assets/FaUserCircle.svg"
// // import logo from "../../assets/ScoreLens-Logo.png"
// // import storeIcon from "../../assets/storeIcon.png"
// // import type { Store, User } from "../../models/DataObject"
// // import { useEffect, useState } from "react"
// // import { fetchCustomerInfoAPI } from "./FetchAPI"
// // import { toast } from "sonner"
// // import { logoutAPI } from "../../pages/Home/services/FetchAPI"
// // const Header = () => {
// //     const loc = useLocation();
// //     const nav = useNavigate();
// //     const [userInfo, setUserInfo] = useState<User | undefined>(loc.state?.userInfo as User | undefined)
// //     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
// //     const storeInfo: Store | undefined = userInfo?.store;
// //     const role = localStorage.getItem('role');

// //     useEffect(() => {
// //         if (!userInfo) {
// //             if (role === "CUSTOMER") {
// //                 // fetch API get profile for customer
// //                 const fetchUserInfo = async () => {
// //                     const response = await fetchCustomerInfoAPI();
// //                     if (response.status === 200)
// //                         setUserInfo(response.data as User);
// //                 }
// //                 fetchUserInfo();
// //             } else {
// //                 // fetch API get profile for staff
// //             }
// //         }
// //     }, [userInfo])

// //     const moveUser = () => {
// //         nav("/login");
// //     }

// //     const logout = () => {
// //         localStorage.removeItem('isAuth');
// //         localStorage.removeItem('userID');
// //         localStorage.removeItem('staffID');
// //         localStorage.removeItem('role');
// //         localStorage.removeItem('customerName');
// //         const logOut = async () => {
// //             const response = await logoutAPI();
// //             if (response.status === 200)
// //                 toast.success(response.message);
// //             else
// //                 toast.error(response.message);
// //         }
// //         logOut();
// //         nav("/login")
// //     }

// //     return (
// //         <div className="bg-white flex border-b border-gray-300 
// //             flex-row justify-between px-5 py-2 items-center 
// //             shadow-xl z-20 max-h-[100px]">
// //             {/*Logo and Name */}
// //             <button
// //                 onClick={moveUser}
// //                 className="flex flex-row items-center cursor-pointer">
// //                 <img src={logo} alt="logo" className="w-20 h-auto" />
// //                 <h3
// //                     className="text-4xl"
// //                     style={{ color: `var(--primary-color)` }}
// //                 >
// //                     SCORE LENS
// //                 </h3>
// //             </button>

// //             {/*User info*/}
// //             <div className="flex flex-row gap-1 items-center">
// //                 {
// //                     // 3. Hiển thị thông tin cửa hàng có điều kiện
// //                     // Chỉ hiển thị khối này nếu storeInfo thực sự tồn tại (không phải undefined)
// //                     storeInfo ?
// //                         <div className="flex flex-row gap-2 items-center bg-orange-100 p-2 rounded-xl">
// //                             <img src={storeIcon} alt="Store Icon" className="w-6 h-auto" />
// //                             <h4 className="text-black text-md font-medium text-xl">{storeInfo.name}</h4>
// //                         </div>
// //                         : null // Không hiển thị gì nếu không có storeInfo
// //                 }
// //                 <div
// //                     onClick={() => setIsSidebarOpen(true)}
// //                     className="flex flex-row gap-2 items-center bg-green-100 p-2 rounded-xl cursor-pointer hover:bg-green-200 transition"
// //                 >
// //                     <img src={userCircleIcon} alt="User Icon" className="w-6 h-auto" />
// //                     <h4 className="text-black text-md font-medium text-xl">{userInfo?.name}</h4>
// //                 </div>
// //                 <div className="w-px h-11 bg-gray-400 mx-2"></div>
// //                 <button onClick={logout} className="cursor-pointer">
// //                     <img src={logoutIcon} alt="Logout Icon" className="w-8 h-auto" />
// //                 </button>
// //             </div>
// //             {isSidebarOpen && (
// //                 <div className="fixed top-0 right-0 w-[350px] h-full bg-white shadow-xl z-50 border-l border-gray-200">
// //                     {/* Header */}
// //                     <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-b border-gray-200">
// //                         <h2 className="text-2xl font-semibold text-gray-800">Thông tin chi tiết</h2>
// //                         <button
// //                             onClick={() => setIsSidebarOpen(false)}
// //                             className="text-gray-500 hover:text-red-600 transition-colors duration-200"
// //                         >
// //                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
// //                             </svg>
// //                         </button>
// //                     </div>

// //                     {/* Content */}
// //                     <div className="p-6">
// //                         <div className="space-y-5">
// //                             {/* Mỗi mục thông tin */}
// //                             <div className="pb-3 border-b border-gray-200">
// //                                 <p className="text-sm text-gray-500">Tên người dùng</p>
// //                                 <p className="text-lg font-medium text-gray-900">{userInfo?.name || 'Chưa cập nhật'}</p>
// //                             </div>

// //                             <div className="pb-3 border-b border-gray-200">
// //                                 <p className="text-sm text-gray-500">Email</p>
// //                                 <p className="text-lg font-medium text-gray-900">{userInfo?.email || 'Chưa cập nhật'}</p>
// //                             </div>

// //                             <div className="pb-3 border-b border-gray-200">
// //                                 <p className="text-sm text-gray-500">Số điện thoại</p>
// //                                 <p className="text-lg font-medium text-gray-900">{userInfo?.phoneNumber || 'Chưa cập nhật'}</p>
// //                             </div>

// //                             <div className="pb-3 border-b border-gray-200">
// //                                 <p className="text-sm text-gray-500">Ngày sinh</p>
// //                                 <p className="text-lg font-medium text-gray-900">{userInfo?.dob || 'Chưa cập nhật'}</p>
// //                             </div>

// //                             <div className="pb-3 border-b border-gray-200">
// //                                 <p className="text-sm text-gray-500">Địa chỉ</p>
// //                                 <p className="text-lg font-medium text-gray-900">{userInfo?.address || 'Chưa cập nhật'}</p>
// //                             </div>

// //                             <div className="pb-3 border-b border-gray-200">
// //                                 <p className="text-sm text-gray-500">Vai trò</p>
// //                                 <p className="text-lg font-medium text-gray-900">{userInfo?.roles?.map(r => r.name).join(", ") || 'Chưa có vai trò'}</p>
// //                             </div>

// //                             <div> {/* Mục cuối không cần border-b */}
// //                                 <p className="text-sm text-gray-500">Trạng thái</p>
// //                                 <p className="text-lg font-medium text-gray-900">{userInfo?.status || 'Không xác định'}</p>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </div>
// //             )}
// //         </div>
// //     )
// // }

// // export default Header

// // Header.tsx - ĐÃ TỐI ƯU RESPONSIVE


// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { toast } from "sonner";

// // Import icons and assets (đảm bảo đường dẫn chính xác)
// import logoutIcon from "../../assets/AiOutlineLogout.svg";
// import userCircleIcon from "../../assets/FaUserCircle.svg";
// import logo from "../../assets/ScoreLens-Logo.png";
// import storeIcon from "../../assets/storeIcon.png";

// // Import types (đảm bảo đường dẫn chính xác)
// import type { Store, User } from "../../models/DataObject";

// // Import API services (đảm bảo đường dẫn chính xác)
// import { logoutAPI } from "../../pages/Home/services/FetchAPI";
// import { fetchCustomerInfoAPI } from "./FetchAPI";

// const Header = () => {
//     const loc = useLocation();
//     const nav = useNavigate();

//     // State để lưu thông tin người dùng, lấy từ location state nếu có
//     const [userInfo, setUserInfo] = useState<User | undefined>(loc.state?.userInfo as User | undefined);
//     // State để quản lý việc mở/đóng sidebar thông tin chi tiết
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//     // Lấy thông tin cửa hàng từ userInfo
//     const storeInfo: Store | undefined = userInfo?.store;
//     // Lấy vai trò từ localStorage để xác định API cần gọi
//     const role = localStorage.getItem('role');

//     // useEffect để fetch thông tin người dùng nếu chưa có
//     useEffect(() => {
//         // Chỉ fetch khi không có userInfo
//         if (!userInfo) {
//             const fetchUserInfo = async () => {
//                 // Mặc định gọi API cho khách hàng
//                 let response;
//                 if (role === "CUSTOMER") {
//                     response = await fetchCustomerInfoAPI();
//                 } else if (role === "STAFF") {
//                     // **TODO**: Thêm logic gọi API cho nhân viên ở đây nếu có
//                     // response = await fetchStaffInfoAPI();
//                     console.log("Cần triển khai API lấy thông tin cho Staff");
//                 }

//                 if (response && response.status === 200) {
//                     setUserInfo(response.data as User);
//                 }
//             };
//             fetchUserInfo();
//         }
//     }, [userInfo, role]); // Phụ thuộc vào userInfo và role

//     // Hàm điều hướng về trang chủ
//     const goHome = () => {
//         nav("/");
//     };

//     // Hàm xử lý đăng xuất
//     const logout = async () => {
//         // Xóa thông tin xác thực khỏi localStorage
//         localStorage.removeItem('isAuth');
//         localStorage.removeItem('userID');
//         localStorage.removeItem('staffID');
//         localStorage.removeItem('role');
//         localStorage.removeItem('customerName');

//         try {
//             const response = await logoutAPI();
//             if (response.status === 200) {
//                 toast.success(response.message || "Đăng xuất thành công!");
//             } else {
//                 toast.error(response.message || "Có lỗi xảy ra khi đăng xuất.");
//             }
//         } catch (error) {
//             toast.error("Không thể kết nối đến máy chủ để đăng xuất.");
//         } finally {
//             // Luôn điều hướng về trang đăng nhập sau khi xử lý xong
//             nav("/login");
//         }
//     };

//     return (
//         <>
//             {/* Header chính */}
//             <div className="bg-white flex border-b border-gray-300 flex-row justify-between px-3 md:px-5 py-2 items-center shadow-md z-30 max-h-[100px]">
//                 {/* Logo và Tên thương hiệu */}
//                 <button onClick={goHome} className="flex flex-row items-center cursor-pointer gap-2">
//                     <img src={logo} alt="ScoreLens Logo" className="w-16 md:w-20 h-auto" />
//                     <h3
//                         className="text-2xl sm:text-3xl md:text-4xl hidden sm:block font-bold"
//                         style={{ color: `var(--primary-color)` }}
//                     >
//                         SCORE LENS
//                     </h3>
//                 </button>

//                 {/* Thông tin người dùng và các nút hành động */}
//                 <div className="flex flex-row gap-2 items-center">
//                     {/* Hiển thị thông tin cửa hàng trên màn hình lớn */}
//                     {storeInfo && (
//                         <div className="hidden md:flex flex-row gap-2 items-center bg-orange-100 p-2 rounded-xl">
//                             <img src={storeIcon} alt="Store Icon" className="w-6 h-auto" />
//                             <h4 className="text-black font-medium text-lg">{storeInfo.name}</h4>
//                         </div>
//                     )}

//                     {/* Nút thông tin người dùng */}
//                     <div
//                         onClick={() => setIsSidebarOpen(true)}
//                         className="flex flex-row gap-2 items-center bg-green-100 p-2 rounded-xl cursor-pointer hover:bg-green-200 transition"
//                     >
//                         <img src={userCircleIcon} alt="User Icon" className="w-6 h-auto" />
//                         {/* Ẩn tên người dùng trên màn hình nhỏ để tiết kiệm không gian */}
//                         <h4 className="text-black font-medium text-base md:text-xl hidden md:block">
//                             {userInfo?.name || "User"}
//                         </h4>
//                     </div>

//                     {/* Dấu gạch ngăn cách */}
//                     <div className="w-px h-10 bg-gray-300 mx-1 md:mx-2"></div>

//                     {/* Nút đăng xuất */}
//                     <button onClick={logout} className="cursor-pointer p-1 rounded-full hover:bg-red-100 transition">
//                         <img src={logoutIcon} alt="Logout Icon" className="w-7 md:w-8 h-auto" />
//                     </button>
//                 </div>
//             </div>

//             {/* Sidebar thông tin chi tiết người dùng */}
//             {isSidebarOpen && (
//                 <>
//                     {/* Lớp phủ nền */}
//                     <div
//                         className="fixed inset-0 bg-black opacity-30 z-40"
//                         onClick={() => setIsSidebarOpen(false)}
//                     ></div>
//                     {/* Nội dung Sidebar */}
//                     <div className="fixed top-0 right-0 w-full max-w-sm sm:max-w-md h-full bg-white shadow-2xl z-50 border-l border-gray-200 flex flex-col">
//                         {/* Header của Sidebar */}
//                         <div className="flex justify-between items-center px-5 py-4 bg-gray-50 border-b border-gray-200 flex-shrink-0">
//                             <h2 className="text-xl font-semibold text-gray-800">Thông tin chi tiết</h2>
//                             <button
//                                 onClick={() => setIsSidebarOpen(false)}
//                                 className="text-gray-500 hover:text-red-600 transition-transform duration-200 hover:rotate-90"
//                             >
//                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                                 </svg>
//                             </button>
//                         </div>

//                         {/* Content của Sidebar, có thể cuộn */}
//                         <div className="p-6 overflow-y-auto">
//                             <div className="space-y-5">
//                                 <div className="pb-3 border-b border-gray-200">
//                                     <p className="text-sm text-gray-500">Tên người dùng</p>
//                                     <p className="text-lg font-medium text-gray-900">{userInfo?.name || 'Chưa cập nhật'}</p>
//                                 </div>
//                                 <div className="pb-3 border-b border-gray-200">
//                                     <p className="text-sm text-gray-500">Email</p>
//                                     <p className="text-lg font-medium text-gray-900">{userInfo?.email || 'Chưa cập nhật'}</p>
//                                 </div>
//                                 <div className="pb-3 border-b border-gray-200">
//                                     <p className="text-sm text-gray-500">Số điện thoại</p>
//                                     <p className="text-lg font-medium text-gray-900">{userInfo?.phoneNumber || 'Chưa cập nhật'}</p>
//                                 </div>
//                                 <div className="pb-3 border-b border-gray-200">
//                                     <p className="text-sm text-gray-500">Ngày sinh</p>
//                                     <p className="text-lg font-medium text-gray-900">{userInfo?.dob || 'Chưa cập nhật'}</p>
//                                 </div>
//                                 <div className="pb-3 border-b border-gray-200">
//                                     <p className="text-sm text-gray-500">Địa chỉ</p>
//                                     <p className="text-lg font-medium text-gray-900 break-words">{userInfo?.address || 'Chưa cập nhật'}</p>
//                                 </div>
//                                 <div className="pb-3 border-b border-gray-200">
//                                     <p className="text-sm text-gray-500">Vai trò</p>
//                                     <p className="text-lg font-medium text-gray-900">{userInfo?.roles?.map(r => r.name).join(", ") || 'Chưa có vai trò'}</p>
//                                 </div>
//                                 <div>
//                                     <p className="text-sm text-gray-500">Trạng thái</p>
//                                     <p className="text-lg font-medium text-gray-900 capitalize">{userInfo?.status || 'Không xác định'}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </>
//             )}
//         </>
//     );
// };

// export default Header;

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Import icons and assets (ensure paths are correct)
import logoutIcon from "../../assets/AiOutlineLogout.svg";
import userCircleIcon from "../../assets/FaUserCircle.svg";
import logo from "../../assets/ScoreLens-Logo.png";
import storeIcon from "../../assets/storeIcon.png";

// Import types (ensure paths are correct)
import type { Store, User } from "../../models/DataObject";

// Import API services (ensure paths are correct)
import { logoutAPI } from "../../pages/Home/services/FetchAPI";
import { fetchCustomerInfoAPI } from "./services/FetchAPI";
import AvatarUploader from "./partials/AvatarUploader";

const Header = () => {
    const loc = useLocation();
    const nav = useNavigate();

    // State for user information, initialized from location state if available
    const [userInfo, setUserInfo] = useState<User | undefined>(loc.state?.userInfo as User | undefined);
    // State to manage the sidebar's visibility
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const storeInfo: Store | undefined = userInfo?.store;
    const role = localStorage.getItem('role');

    const handleAvatarUpdate = (newImageUrl: string) => {
        console.log(newImageUrl)
        setUserInfo(currentUser => {
            if (!currentUser) return undefined;
            return {
                ...currentUser,
                avatarUrl: newImageUrl,
            };
        });
    };

    // Fetch user info if it's not already available
    useEffect(() => {
        if (!userInfo) {
            const fetchUserInfo = async () => {
                let response;
                if (role === "CUSTOMER") {
                    response = await fetchCustomerInfoAPI();
                } else if (role === "STAFF") {
                    // TODO: Implement API fetch for Staff information here
                    console.log("TODO: Implement API fetch for Staff information");
                }

                if (response && response.status === 200) {
                    setUserInfo(response.data as User);
                }
            };
            fetchUserInfo();
        }
    }, [userInfo, role]);

    // Navigate to the homepage
    const goHome = () => {
        nav("/");
    };

    // Handle user logout
    const logout = async () => {
        // Clear authentication data from localStorage
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
            // Always navigate to login page after handling logout
            nav("/login");
        }
    };

    return (
        <>
            {/* Main Header */}
            <header className="bg-white flex border-b border-gray-300 flex-row justify-between px-3 md:px-5 py-2 items-center shadow-md z-30 max-h-[100px]">
                {/* Logo and Brand Name */}
                <button onClick={goHome} className="flex flex-row items-center cursor-pointer gap-2">
                    <img src={logo} alt="ScoreLens Logo" className="w-16 md:w-20 h-auto" />
                    <h3
                        className="text-2xl sm:text-3xl md:text-4xl hidden sm:block font-bold"
                        style={{ color: `var(--primary-color)` }}
                    >
                        SCORE LENS
                    </h3>
                </button>

                {/* User Info and Actions */}
                <div className="flex flex-row gap-2 items-center">
                    {storeInfo && (
                        <div className="hidden md:flex flex-row gap-2 items-center bg-orange-100 p-2 rounded-xl">
                            <img src={storeIcon} alt="Store Icon" className="w-6 h-auto" />
                            <h4 className="text-black font-medium text-lg">{storeInfo.name}</h4>
                        </div>
                    )}

                    {/* User Info Button */}
                    <div
                        onClick={() => setIsSidebarOpen(true)}
                        className="flex flex-row gap-2 items-center bg-green-100 p-2 rounded-xl cursor-pointer hover:bg-green-200 transition"
                    >
                        <img src={userCircleIcon} alt="User Icon" className="w-6 h-auto" />
                        <h4 className="text-black font-medium text-base md:text-xl hidden md:block">
                            {userInfo?.name || "User"}
                        </h4>
                    </div>

                    <div className="w-px h-10 bg-gray-300 mx-1 md:mx-2"></div>

                    {/* Logout Button */}
                    <button onClick={logout} className="cursor-pointer p-1 rounded-full hover:bg-red-100 transition">
                        <img src={logoutIcon} alt="Logout Icon" className="w-7 md:w-8 h-auto" />
                    </button>
                </div>
            </header>

            {/* User Profile Sidebar */}
            {isSidebarOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black opacity-30 z-40"
                        onClick={() => setIsSidebarOpen(false)}
                    ></div>
                    {/* Sidebar Content */}
                    <aside className="fixed top-0 right-0 w-full max-w-sm sm:max-w-md h-full bg-white shadow-2xl z-50 border-l border-gray-200 flex flex-col font-sans">
                        {/* Sidebar Header */}
                        <div className="flex justify-between items-center px-5 py-4 bg-gray-50 border-b border-gray-200 flex-shrink-0">
                            <h2 className="text-xl font-bold text-gray-800">Profile Details</h2>
                            <button
                                onClick={() => setIsSidebarOpen(false)}
                                className="cursor-pointer text-gray-500 hover:text-red-600 transition-transform duration-200 hover:rotate-90"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Sidebar Body (Scrollable) */}
                        <div className="overflow-y-auto">
                            {/* === KHU VỰC AVATAR ĐÃ ĐƯỢC THAY THẾ === */}
                            <div className="flex flex-col items-center p-6 border-b border-gray-200 bg-gray-50">
                                <AvatarUploader
                                    customerId={userInfo?.customerID}
                                    initialAvatarUrl={userInfo?.imageUrl || userCircleIcon}
                                    onUploadSuccess={handleAvatarUpdate}
                                />
                                <h3 className="text-xl font-bold text-gray-900 mt-4">{userInfo?.name || 'User Name'}</h3>
                                <p className="text-sm text-gray-500">{userInfo?.email || 'no-email@example.com'}</p>
                            </div>

                            {/* === OTHER DETAILS SECTION === */}
                            <div className="p-6 space-y-5">
                                <div className="pb-3 border-b border-gray-200">
                                    <p className="text-sm text-gray-500">Phone Number</p>
                                    <p className="text-lg font-medium text-gray-900">{userInfo?.phoneNumber || 'Not provided'}</p>
                                </div>
                                <div className="pb-3 border-b border-gray-200">
                                    <p className="text-sm text-gray-500">Date of Birth</p>
                                    <p className="text-lg font-medium text-gray-900">{userInfo?.dob || 'Not provided'}</p>
                                </div>
                                <div className="pb-3 border-b border-gray-200">
                                    <p className="text-sm text-gray-500">Address</p>
                                    <p className="text-lg font-medium text-gray-900 break-words">{userInfo?.address || 'Not provided'}</p>
                                </div>
                                <div className="pb-3 border-b border-gray-200">
                                    <p className="text-sm text-gray-500">Roles</p>
                                    <p className="text-lg font-medium text-gray-900 capitalize">{userInfo?.roles?.map(r => r.name).join(", ") || 'No roles assigned'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Status</p>
                                    <p className="text-lg font-medium text-gray-900 capitalize">{userInfo?.status || 'Unknown'}</p>
                                </div>
                            </div>
                        </div>
                    </aside>
                </>
            )}
        </>
    );
};

export default Header;