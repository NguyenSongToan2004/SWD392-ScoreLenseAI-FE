// import LoginRegisterForm from "./LoginRegisterForm";
// import "./index.css";

// export default function Login() {
//   return (
//     <div className="flex h-screen overflow-hidden">
//       <div
//         className="flex-7 basis-7/10 bg-cover bg-center bg-no-repeat"
//         style={{ backgroundImage: "url(login-banner.png)" }}
//       ></div>

//       <div className="flex-3 basis-3/10">
//         <LoginRegisterForm />
//       </div>
//     </div>
//   );
// }

import LoginRegisterForm from "./LoginRegisterForm";
import "./index.css";

export default function Login() {
  return (
    // Thay đổi ở đây: Áp dụng 'flex' chỉ cho màn hình lớn (lg) trở lên.
    <div className="h-screen overflow-hidden lg:flex">
      {/* Thay đổi ở đây: Ẩn banner trên màn hình nhỏ và chỉ hiện thị trên màn hình lớn */}
      <div
        className="hidden bg-cover bg-center bg-no-repeat lg:block lg:basis-7/10"
        style={{ backgroundImage: "url(login-banner.png)" }}
      ></div>

      {/* Thay đổi ở đây: Chiếm toàn bộ chiều rộng trên mobile và 3/10 trên màn hình lớn */}
      <div className="basis-full lg:basis-3/10">
        <LoginRegisterForm />
      </div>
    </div>
  );
}