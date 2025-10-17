import { useNavigate } from 'react-router-dom';
import logInIcon from "../../../assets/BiLogInCircle.svg";
import { logoutAPI } from '../services/FetchAPI';
import { useState } from 'react';
import { toast } from 'sonner';

const AuthButton = () => {
    const nav = useNavigate();
    // Đọc giá trị từ localStorage một lần khi component khởi tạo
    const [isAuth, setIsAuth] = useState(() => localStorage.getItem('isAuth') === 'true');

    const handleLogin = () => {
        nav("/login");
    }

    const handleLogout = () => {
        localStorage.removeItem('isAuth');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('customerID');
        localStorage.removeItem('auth');
        localStorage.removeItem('fcmToken');

        setIsAuth(false);

        const logoutPromise = async () => {
            const response = await logoutAPI();
            if (response.status !== 200) {
                throw new Error(response.message);
            }
            return response;
        };

        // 3. Gọi toast.promise
        toast.promise(logoutPromise(), {
            loading: 'Logging out, please wait...',
            success: (response) => {
                nav("/login");
                return response.message;
            },
            error: (error) => {
                nav("/login");
                return error.message;
            },
        });
    };


    // Tái cấu trúc: Xác định văn bản và hành động dựa trên trạng thái
    const buttonText = isAuth ? 'LOGOUT' : 'LOGIN';
    const clickHandler = isAuth ? handleLogout : handleLogin;

    return (
        // Chỉ cần một cấu trúc button duy nhất
        <button
            className="absolute top-2 right-2 md:top-5 md:right-5 text-button
            px-2 md:px-3 py-1 rounded-sm flex flex-row flex-nowrap gap-1 items-center cursor-pointer"
            onClick={clickHandler}
        >
            {/* THAY ĐỔI: Giảm font-size cho mobile và giữ size lớn cho desktop */}
            <h5 className="text-sm
             md:text-2xl font-thin">{buttonText}</h5>
            <img src={logInIcon} alt="Authentication Icon" className='h-auto w-5' />
        </button>
    )
}

export default AuthButton;
