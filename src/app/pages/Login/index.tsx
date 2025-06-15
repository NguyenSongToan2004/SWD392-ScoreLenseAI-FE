import LoginRegisterForm from "./LoginRegisterForm";
import "./index.css";

export default function Login() {
  return (
    <div className="flex h-screen overflow-hidden">
      <div
        className="flex-7 basis-7/10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(login-banner.png)" }}
      ></div>

      <div className="flex-3 basis-3/10">
        <LoginRegisterForm />
      </div>
    </div>
  );
}
