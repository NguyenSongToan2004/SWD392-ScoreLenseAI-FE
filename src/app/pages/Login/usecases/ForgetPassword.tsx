import { Button, Form } from "antd";
import { motion } from "motion/react";
import { useState } from "react";
import { MdEmail, MdLockReset, MdArrowBack } from "react-icons/md";
import { RiShieldKeyholeLine, RiMailSendLine } from "react-icons/ri";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { toast } from "sonner";
import NInputLabel from "../../../components/basicUI/NInputLabel";
import { forgotPasswordAPI } from "../services/FetchAPI";

// Custom CSS để đè lên styles của Ant Design
const customButtonStyles = `
  .custom-gradient-button.ant-btn {
    height: 40px !important;
    font-size: 18px !important;
    font-weight: 600 !important;
    background: linear-gradient(to right, #10b981, #0d9488) !important;
    border: none !important;
    border-radius: 12px !important;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 8px !important;
    transition: all 0.3s ease !important;
    color: white !important;
  }
  
  .custom-gradient-button.ant-btn:hover {
    background: linear-gradient(to right, #059669, #0f766e) !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
    color: white !important;
  }
  
  .custom-gradient-button.ant-btn:focus {
    background: linear-gradient(to right, #10b981, #0d9488) !important;
    color: white !important;
  }
  
  .custom-gradient-button.ant-btn:active {
    background: linear-gradient(to right, #059669, #0f766e) !important;
    transform: translateY(0px) !important;
    color: white !important;
  }
  
  .custom-gradient-button.ant-btn[disabled] {
    background: #d1d5db !important;
    color: #9ca3af !important;
    cursor: not-allowed !important;
  }
`;

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
      toast.success("Email reset password đã được gửi!");
    } catch (error) {
      toast.error("Có lỗi xảy ra. Vui lòng thử lại!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Inject custom CSS */}
      <style>{customButtonStyles}</style>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-20 h-20 bg-emerald-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-teal-200 rounded-full opacity-30 animate-bounce"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-cyan-200 rounded-full opacity-25 animate-pulse"></div>
          <div className="absolute bottom-40 right-10 w-12 h-12 bg-emerald-300 rounded-full opacity-20"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20 relative z-10"
        >
          {/* Back button with icon */}
          <motion.button
            className="absolute -top-2 -left-2 bg-white border-2 border-emerald-200 px-3 py-2 rounded-xl cursor-pointer hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300 shadow-lg flex items-center gap-2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            type="button"
            onClick={() => window.history.back()}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <MdArrowBack className="text-emerald-600 text-lg" />
            <span className="text-emerald-600 font-medium text-sm">Back</span>
          </motion.button>

          {/* Header with icon */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-emerald-400 to-teal-500 p-4 rounded-full shadow-lg">
                <MdLockReset className="text-3xl text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Forgot Password?
            </h2>
            <p className="text-gray-600 text-sm flex items-center justify-center gap-2">
              <HiOutlineShieldCheck className="text-emerald-500" />
              Don't worry, we'll help you reset it
            </p>
          </motion.div>

          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please enter your email!",
                  },
                  {
                    type: "email",
                    message: "Please enter a valid email!",
                  },
                ]}
              >
                <div className="relative">
                  <NInputLabel
                    label="EMAIL ADDRESS"
                    type="email"
                    prefix={
                      <div className="flex items-center">
                        <MdEmail className="text-emerald-500 text-lg" />
                      </div>
                    }
                  />
                </div>
              </Form.Item>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                  style={{
                    height: "40px !important",
                    fontSize: "18px",
                    fontWeight: "600",
                    background: "linear-gradient(to right, #10b981, #0d9488)",
                    border: "none",
                    borderRadius: "12px",
                    boxShadow:
                      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    transition: "all 0.3s ease",
                  }}
                  className="custom-gradient-button"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(to right, #059669, #0f766e)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(to right, #10b981, #0d9488)";
                    e.currentTarget.style.transform = "translateY(0px)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
                  }}
                >
                  {!loading && <RiMailSendLine className="text-xl" />}
                  Send Reset Email
                </Button>
              </Form.Item>
            </motion.div>
          </Form>

          {/* Additional security info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-6 p-4 bg-emerald-50/50 rounded-xl border border-emerald-100"
          >
            <div className="flex items-start gap-3">
              <RiShieldKeyholeLine className="text-emerald-600 text-xl flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-600">
                <p className="font-medium text-emerald-700 mb-1">
                  Security Notice
                </p>
                <p>
                  We'll send a secure reset link to your email. The link will
                  expire in 15 minutes for your security.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default ForgetPassword;
