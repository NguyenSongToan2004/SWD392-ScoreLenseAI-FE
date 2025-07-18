import { Button, Form } from 'antd';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { FaLock } from 'react-icons/fa';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import NInputLabel from '../../../components/basicUI/NInputLabel';
import { resetPasswordAPI } from '../services/FetchAPI';

const ResetPassword = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');

    useEffect(() => {
        if (!token) {
            toast.error('Invalid reset link');
            navigate('/login');
        }
    }, [token, navigate]);

    const handleSubmit = async (values: { password: string; confirmPassword: string }) => {
        setLoading(true);
        console.log('Reset password with token:', token);
        console.log('New password:', values.password);

        if (token) {
            const response = await resetPasswordAPI(token, values.password, values.confirmPassword);

            if (response.status === 200) {
                toast.success('Password reset successfully!');
                navigate('/login');
            } else {
                toast.error(response.message);
            }
        } else {
            toast.error('Invalid reset link');
            return;
        }

        setLoading(false);
    };

    if (!token) {
        return null;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    Reset Password
                </h2>

                <Form
                    form={form}
                    onFinish={handleSubmit}
                    layout="vertical"
                >
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                    >
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your new password!",
                                },
                                {
                                    min: 6,
                                    message: "Password must be at least 6 characters!",
                                }
                            ]}
                        >
                            <NInputLabel
                                label="NEW PASSWORD"
                                type="password"
                                prefix={<FaLock />}
                            />
                        </Form.Item>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                    >
                        <Form.Item
                            name="confirmPassword"
                            dependencies={['password']}
                            rules={[
                                {
                                    required: true,
                                    message: "Please confirm your password!",
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Passwords do not match!'));
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
                        transition={{ duration: 0.4, delay: 0.4 }}
                    >
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                block
                                className="h-12 text-lg font-semibold"
                            >
                                Reset Password
                            </Button>
                        </Form.Item>
                    </motion.div>
                </Form>
            </motion.div>
        </div>
    );
};

export default ResetPassword;