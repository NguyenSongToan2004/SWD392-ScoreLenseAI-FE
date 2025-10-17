import { useGoogleLogin } from '@react-oauth/google';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { requestNotificationPermission, sendTokenToServer } from '../../../../services/fcmService';
import type { TableOperationRequest } from '../../../models/DataObject';
import type { GoogleUserData } from '../models/auth';
import { decodeAccessToken, loginGoogleAPI } from '../services/FetchAPI';

const GoogleButton = () => {
    const nav = useNavigate()
    const location = useLocation();
    const loginGG = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                const userInfo: GoogleUserData = await decodeAccessToken(response.access_token) as GoogleUserData;

                const loginPromise = async () => {
                    const response = await loginGoogleAPI(userInfo.email, userInfo.given_name, userInfo.picture);
                    if (response.status !== 200) {
                        throw new Error(response.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
                    }

                    return response;
                };
                const returnURL = location.state?.from;

                const sendToken = async () => {
                    const fcmToken = await requestNotificationPermission();

                    if (fcmToken) {
                        // const userID = data.customerDto.customerID
                        const form: TableOperationRequest = {
                            operationType: "register",
                            tableID: "4c0307d1-6116-4950-9149-f02af06b623b",
                            token: fcmToken
                        }
                        await sendTokenToServer(form);
                    }
                }

                toast.promise(loginPromise(), {
                    loading: 'Logging in... Please wait!',
                    success: async (response) => {
                        await sendToken()

                        const destination =  (returnURL && returnURL !== "/") ? returnURL : '/4c0307d1-6116-4950-9149-f02af06b623b';
                        nav(destination, { replace: true });
                        return response.message;
                    },
                    error: (error) => {
                        return error.message;
                    },
                });


            } catch (error) {
                console.error(error);
            }
        },
    });

    return (
        <>
            <div className="flex items-center justify-center gap-4 my-4">
                {/* <div className="flex-1 h-px bg-gray-300" /> */}

                <button
                    onClick={() => loginGG()}
                    className="flex items-center cursor-pointer gap-2 border border-gray-300 rounded px-4 py-2 hover:bg-gray-100 transition"
                >
                    <img
                        src="https://id-frontend.prod-east.frontend.public.atl-paas.net/assets/google-logo.5867462c.svg"
                        alt="Google logo"
                        className="w-5 h-5"
                    />
                    <span>Login Google</span>
                </button>

                {/* <div className="flex-1 h-px bg-gray-300" /> */}
            </div>
        </>
    )
}

export default GoogleButton
