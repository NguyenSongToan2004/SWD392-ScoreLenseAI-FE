import { Button, Form } from 'antd';
import { motion } from 'motion/react';
import { useState } from 'react';
import { MdEmail } from 'react-icons/md';
import { toast } from 'sonner';
import NInputLabel from '../../../components/basicUI/NInputLabel';
import { forgotPasswordAPI } from '../services/FetchAPI';

const ForgetPassword = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values: { email: string }) => {
        setLoading(true);
        try {
            const apiResponse = await forgotPasswordAPI(values.email);
            if (apiResponse.status !== 200) {
                toast.error(apiResponse.message);
            }
            toast.success('Email reset password đã được gửi!');
        } catch (error) {
            toast.error('Có lỗi xảy ra. Vui lòng thử lại!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    Forgot Password
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
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your email!",
                                },
                                {
                                    type: 'email',
                                    message: "Please enter a valid email!",
                                }
                            ]}
                        >
                            <NInputLabel
                                label="EMAIL"
                                type="email"
                                prefix={<MdEmail />}
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
                                Send Reset Email
                            </Button>
                        </Form.Item>
                    </motion.div>
                </Form>
            </motion.div>
        </div>
    );
};

export default ForgetPassword;
