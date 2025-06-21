import { useNavigate } from 'react-router-dom'
import logInIcon from "../../../assets/BiLogInCircle.svg"
import { logoutAPI } from '../services/FetchAPI'
import { useState } from 'react';
import { toast } from 'sonner';
const AuthButton = () => {
    const nav = useNavigate();
    const isAuthLocal = localStorage.getItem('isAuth');
    const [isAuth, setIsAuth] = useState<string | null>(isAuthLocal as string);
    const handleLogin = () => {
        nav("/login")
    }

    const handleLogout = () => {
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
        setIsAuth("false");
        logOut();
    }

    return (
        <>
            {isAuth !== 'true'
                ?
                <button
                    className="absolute top-5 right-5 text-button px-3 py-1 text-xl
                 rounded-sm flex flex-row flex-nowrap gap-1 items-center cursor-pointer"
                    onClick={handleLogin}
                >
                    <h5 className="text-2xl font-thin">LOGIN</h5>
                    <img src={logInIcon} alt="Next Icon" />
                </button>
                :
                <button
                    className="absolute top-5 right-5 text-button px-3 py-1 text-xl
                 rounded-sm flex flex-row flex-nowrap gap-1 items-center cursor-pointer"
                    onClick={handleLogout}
                >
                    <h5 className="text-2xl font-thin">LOGOUT</h5>
                    <img src={logInIcon} alt="Next Icon" />
                </button>
            }
        </>
    )
}

export default AuthButton
