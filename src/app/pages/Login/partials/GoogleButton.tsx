import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import type { AuthResponse, TableOperationRequest } from '../../../models/DataObject';
import type { GoogleUserData } from '../models/auth';
import { decodeAccessToken, loginGoogleAPI } from '../services/FetchAPI';
import { requestNotificationPermission, sendTokenToServer } from '../../../../services/fcmService';

const GoogleButton = () => {
    const nav = useNavigate()
    const loginGG = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                const userInfo: GoogleUserData = await decodeAccessToken(response.access_token) as GoogleUserData;

                const loginPromise = async () => {
                    const response = await loginGoogleAPI(userInfo.email, userInfo.given_name, userInfo.picture);
                    if (response.status !== 200) {
                        throw new Error(response.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
                    }

                    // Request notification permission
                    const fcmToken = await requestNotificationPermission();
                    if (fcmToken) {
                        const data = response.data as AuthResponse;
                        const userID = data.user.customerID || data.user.staffID;
                        const form: TableOperationRequest = {
                            operationType: "register",
                            tableID: "e8602f47-b5f3-4bea-ad82-93dbc408171b",
                            token: fcmToken
                        }

                        if (userID) {
                            await sendTokenToServer(form);
                            // if (data.userType === "CUSTOMER") {
                            //     let returnURL = localStorage.getItem('returnURL');
                            //     if (returnURL) {
                            //         localStorage.removeItem('returnURL');
                            //         console.log(returnURL);
                            //         nav(`/${returnURL}`);
                            //     } else {
                            //         nav('/23374e21-2391-41b0-b275-651df88b3b04')
                            //     }
                            // } else {
                            //     nav('/admin', {
                            //         state: {
                            //             userInfo: data.user
                            //         }
                            //     });
                            // }
                        }
                    }

                    return response;
                };
                let returnURL = localStorage.getItem('returnURL');
                toast.promise(loginPromise(), {
                    loading: 'Đang đăng nhập...',
                    success: (response) => {
                        const data = response.data as AuthResponse;
                        if (data.userType === "CUSTOMER") {
                            if (returnURL) {
                                localStorage.removeItem('returnURL');
                                nav(`${returnURL}`);
                            } else {
                                nav('/23374e21-2391-41b0-b275-651df88b3b04')
                            }
                        } else {
                            nav('/admin', {
                                state: {
                                    userInfo: data.user
                                }
                            });
                        }

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
