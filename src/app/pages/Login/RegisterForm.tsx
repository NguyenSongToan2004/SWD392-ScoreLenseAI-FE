import Button from "antd/es/button/button.js"
import Form from "antd/es/form"
import { motion } from "motion/react";
import NInputLabel from "../../components/basicUI/NInputLabel";
import { FaLock, FaUser } from "react-icons/fa";
import { RiLoginCircleLine } from "react-icons/ri";
import type { RegisterFormData } from "./models/auth";
import { Suspense } from "react";
import { registerAPI } from "./services/FetchAPI";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface RegisterFormProps {
    onRegister: (values: RegisterFormData) => void;
    setRegister: (isRegis: boolean) => void;
}

export default function RegisterForm({ onRegister, setRegister }: RegisterFormProps) {
    const [form] = Form.useForm();
    const nav = useNavigate();
    const handleRegister = (values: RegisterFormData) => {
        onRegister(values);
        const register = async () => {
            const response = await registerAPI(values.username, values.password);
            if (response.status === 200) {
                toast.success(response.message);
                setRegister(false);
                nav("/login");
            } else {
                toast.error(response.message);
            }
        }

        register();
    };

    return (
        <Suspense>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Form
                    name="register"
                    onFinish={handleRegister}
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
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.5 }}
                    >
                        <Form.Item
                            name="confirm"
                            dependencies={["password"]}
                            rules={[
                                {
                                    required: true,
                                    message: "Please confirm your password!",
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue("password") === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject("Passwords do not match!");
                                    },
                                }),
                            ]}
                        >
                            <NInputLabel
                                label="CONFIRM PASSWORD"
                                type="password"
                                prefix={<FaLock />}
                            />
                        </Form.Item>
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
                                    register
                                </Button>
                            </motion.div>
                        </Form.Item>
                    </motion.div>
                </Form>
            </motion.div>
        </Suspense>
    );
} 