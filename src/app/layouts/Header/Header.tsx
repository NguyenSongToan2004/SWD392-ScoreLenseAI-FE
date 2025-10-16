import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Import icons and assets (ensure paths are correct)
import logoutIcon from "../../assets/AiOutlineLogout.svg";
import userCircleIcon from "../../assets/FaUserCircle.svg";
import logo from "../../assets/ScoreLens-Logo.png";
import storeIcon from "../../assets/storeIcon.png";

// Import types (ensure paths are correct)
import type { CustomerProfileResponse, Store } from "../../models/DataObject";

// Import API services (ensure paths are correct)
import { logoutAPI } from "../../pages/Home/services/FetchAPI";
import AvatarUploader from "./partials/AvatarUploader";
import { fetchCustomerInfoAPI } from "./services/FetchAPI";

const Header = () => {
    // const loc = useLocation();
    const nav = useNavigate();

    console.log('header render')

    const [userInfo, setUserInfo] = useState<CustomerProfileResponse | undefined>(undefined);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const storeInfo: Store | undefined = undefined;

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
            console.log('fetch user')
            console.log(userInfo)
            const fetchUserInfo = async () => {
                console.log('fetch customer');
                let response = await fetchCustomerInfoAPI();
                // if (role === "CUSTOMER") {
                    
                //     response = 
                // } else if (role === "STAFF") {
                //     console.log('fetch staff');
                //     response = await fetchStaffInfoAPI();
                //     console.log("TODO: Implement API fetch for Staff information");
                // }

                if (response && response.status === 200) {
                    setUserInfo(response.data as CustomerProfileResponse);
                }
            };
            fetchUserInfo();
        }
    }, [userInfo]);

    // Navigate to the homepage
    const goHome = () => {
        nav("/");
    };

    // Handle user logout
    const logout = () => {
        // Clear authentication data from localStorage
        localStorage.removeItem('isAuth');
        localStorage.removeItem('customerID');
        localStorage.removeItem('customerName');
        localStorage.removeItem('accessToken');

        const logoutPromise = async () => {
            const response = await logoutAPI();
            if (response.status !== 200) {
                throw new Error(response.message || "An error occurred during logout.");
            }
            return response;
        };

        toast.promise(logoutPromise(), {
            loading: 'Logging out, please wait...',
            success: (response) => {
                nav("/login");
                return response.message || "Logged out successfully!";
            },
            error: (error) => {
                nav("/login");
                return error.message || "Could not connect to the server to log out.";
            },
        });
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
                            <h4 className="text-black font-medium text-lg">{"Conie"}</h4>
                        </div>
                    )}

                    {/* User Info Button */}
                    <div
                        onClick={() => setIsSidebarOpen(true)}
                        className="flex flex-row gap-2 items-center bg-green-100 p-2 rounded-xl cursor-pointer hover:bg-green-200 transition"
                    >
                        <img src={userCircleIcon} alt="User Icon" className="w-6 h-auto" />
                        <h4 className="text-black font-medium text-base md:text-xl hidden md:block">
                            {userInfo?.customerName || "User"}
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
                                    userId={userInfo?.customerId}
                                    initialAvatarUrl={userInfo?.imageUrl || userCircleIcon}
                                    role={"CUSTOMER"}
                                    onUploadSuccess={handleAvatarUpdate}
                                />
                                <h3 className="text-xl font-bold text-gray-900 mt-4">{userInfo?.customerName || 'User Name'}</h3>
                                <p className="text-sm text-gray-500">{userInfo?.email || 'no-email@example.com'}</p>
                            </div>

                            {/* === OTHER DETAILS SECTION === */}
                            <div className="p-6 space-y-5">
                                <div className="pb-3 border-b border-gray-200">
                                    <p className="text-sm text-gray-500">Phone Number</p>
                                    <p className="text-lg font-medium text-gray-900">{userInfo?.phone || 'Not provided'}</p>
                                </div>
                                <div className="pb-3 border-b border-gray-200">
                                    <p className="text-sm text-gray-500">Customer Type</p>
                                    <p className="text-lg font-medium text-gray-900">{userInfo?.customerType || 'Not provided'}</p>
                                </div>
                                {/* <div className="pb-3 border-b border-gray-200">
                                    <p className="text-sm text-gray-500">Address</p>
                                    <p className="text-lg font-medium text-gray-900 break-words">{userInfo?.ad || 'Not provided'}</p>
                                </div> */}
                                <div className="pb-3 border-b border-gray-200">
                                    <p className="text-sm text-gray-500">Status</p>
                                    <p className="text-lg font-medium text-gray-900 capitalize">{userInfo?.phone || 'No roles assigned'}</p>
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
