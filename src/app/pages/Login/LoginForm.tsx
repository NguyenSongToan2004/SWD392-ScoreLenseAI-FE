import { Button, Checkbox, Form } from "antd";
import { motion } from "motion/react";
import NInputLabel from "../../components/basicUI/NInputLabel";
import { FaLock, FaUser } from "react-icons/fa";
import { RiLoginCircleLine } from "react-icons/ri";
import type { LoginFormData } from "./models/auth";
import { Suspense } from "react";
import { loginAPI } from "./services/FetchAPI";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { AuthResponse, TableOperationRequest } from "../../models/DataObject";
import GoogleButton from "./partials/GoogleButton";
import { navigateWithState } from "../../Utils/navigationUtils";
import { requestNotificationPermission, sendTokenToServer } from "../../../services/fcmService";

interface LoginFormProps {
    onLogin: (values: LoginFormData) => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
    const [form] = Form.useForm();
    const nav = useNavigate();

    const handleLogin = async (values: LoginFormData) => {
        onLogin(values);

        const loginPromise = async () => {
            const response = await loginAPI(values.username, values.password);
            if (response.status !== 200) {
                throw new Error(response.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
            }

            // Request notification permission sau khi login thành công
            const fcmToken = await requestNotificationPermission();

            if (fcmToken) {
                const data = response.data as AuthResponse;
                const userID = data.user.customerID || data.user.staffID;
                const form: TableOperationRequest = {
                    operationType: "register",
                    tableID: "23374e21-2391-41b0-b275-651df88b3b04",
                    token: fcmToken
                }
                if (userID) {
                    await sendTokenToServer(form);
                    if (data.userType === "CUSTOMER") {
                        nav('/23374e21-2391-41b0-b275-651df88b3b04');
                    } else {
                        nav('/admin', {
                            state: {
                                userInfo: data.user
                            }
                        });
                    }
                } else {
                    console.log('ko co user nhe !!');
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
                    navigateWithState(nav, '/admin', {
                        userInfo: data.user
                    });
                }
                return response.message;
            },
            error: (error) => {
                return error.message;
            },
        });
    };

    return (
        <Suspense fallback={<div></div>}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Form
                    name="login"
                    onFinish={handleLogin}
                    layout="vertical"
                    form={form}
                >
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                    >
                        <Form.Item
                            name="username"
                            className="custom-form-item"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your username!",

                                },
                            ]}
                        >
                            <NInputLabel label="USERNAME" prefix={<FaUser />} />
                        </Form.Item>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                    >
                        <Form.Item
                            name="password"
                            className="custom-form-item"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your password!",
                                },
                            ]}
                        >
                            <NInputLabel label="PASSWORD" type="password" prefix={<FaLock />} />
                        </Form.Item>
                    </motion.div>

                    <motion.div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "15px",
                            fontSize: "1rem",
                            fontFamily: "Bebas Neue, sans-serif",
                        }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.5 }}
                    >
                        <Form.Item name="remember" noStyle>
                            <Checkbox
                                style={{
                                    fontFamily: "Bebas Neue, sans-serif",
                                    fontSize: "1rem",
                                }}
                            >
                                Remember
                            </Checkbox>
                        </Form.Item>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link to="/forget-password" style={{ color: "#1f7d53", textDecoration: 'none' }}>
                                Forgot password?
                            </Link>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.6 }}
                    >
                        <Form.Item>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button
                                    icon={<RiLoginCircleLine size={20} />}
                                    className="login-button"
                                    htmlType="submit"
                                    block
                                >
                                    login
                                </Button>
                            </motion.div>
                        </Form.Item>
                    </motion.div>
                </Form>
            </motion.div>
            <GoogleButton />
        </Suspense>
    );
} 
