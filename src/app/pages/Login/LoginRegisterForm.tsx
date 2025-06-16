import { useState } from "react";
import { Button } from "antd";
import { FaPlay } from "react-icons/fa";
import { motion, AnimatePresence } from "motion/react";
import type { LoginFormData, RegisterFormData } from "../../types/auth";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function LoginRegisterForm() {
  const [isRegister, setIsRegister] = useState(false);

  const handleLogin = (values: LoginFormData) => {
    console.log("Login values:", values);
    // Add your login logic here
  };

  const handleRegister = (values: RegisterFormData) => {
    console.log("Register values:", values);
    // Add your register logic here
  };

  return (
    <div className="relative w-full h-screen">
      <div className="flex flex-col items-center justify-start h-full">
        {/* Animated Logo */}
        <motion.img
          className="select-none w-55 h-55"
          src="login-logo.png"
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{
            duration: 0.8,
            ease: "backOut",
            delay: 0.2
          }}
        />

        {/* Animated Title */}
        <motion.h2
          className="title"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            delay: 0.8
          }}
        >
          score lens
        </motion.h2>

        {/* Animated Form with transition */}
        <AnimatePresence mode="wait">
          {isRegister ? (
            <motion.div
              key="register"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{
                duration: 0.4,
                ease: "easeInOut"
              }}
              className="w-[80%]"
            >
              <RegisterForm onRegister={handleRegister} />
            </motion.div>
          ) : (
            <motion.div
              key="login"
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{
                duration: 0.4,
                ease: "easeInOut"
              }}
              className="w-[80%]"
            >
              <LoginForm onLogin={handleLogin} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Animated Art components */}
      <motion.div
        className="absolute -bottom-10 left-0 z-5"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
          delay: 1.2
        }}
      >
        <img className="pointer-events-none select-none" src="login-art1.png" />
      </motion.div>

      <motion.div
        className="absolute -bottom-10 right-0"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
          delay: 1.4
        }}
      >
        <img className="pointer-events-none select-none" src="login-art2.png" />
      </motion.div>

      {/* Animated Toggle Button */}
      <motion.div
        className="absolute bottom-3 right-3 z-10"
        initial={{ scale: 0, rotate: 90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          duration: 0.5,
          ease: "backOut",
          delay: 1.6
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          icon={<FaPlay size={15} />}
          iconPosition="end"
          className="float-button"
          onClick={() => setIsRegister((prev) => !prev)}
        >
          {isRegister ? "Login" : "Register"}
        </Button>
      </motion.div>
    </div>
  );
}
