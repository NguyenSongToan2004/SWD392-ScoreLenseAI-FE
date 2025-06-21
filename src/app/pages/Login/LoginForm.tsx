import { Button, Checkbox, Form } from "antd";
import { motion } from "motion/react";
import NInputLabel from "../../components/basicUI/NInputLabel";
import { FaLock, FaUser } from "react-icons/fa";
import { RiLoginCircleLine } from "react-icons/ri";
import type { LoginFormData } from "./models/auth";
import { Suspense } from "react";
import loginAPI from "./services/FetchAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface LoginFormProps {
    onLogin: (values: LoginFormData) => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
    const [form] = Form.useForm();
    const nav = useNavigate();

    const handleLogin = async (values: LoginFormData) => {
        onLogin(values);
        const resposne = await loginAPI(values.username, values.password);
        if (resposne.status == 200) {
            toast.success(resposne.message);
            nav('/b80255e6-d572-498e-b348-03dfcc57e2ad');
        }
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
                        <motion.a
                            style={{ color: "#1f7d53" }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Forgot password?
                        </motion.a>
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
        </Suspense>
    );
} 