import ellipseLeft from "../../../assets/Home_Ellipse_Left.png";
import ellipseRight from "../../../assets/Home_Ellipse_Right.png";
import logo from "../../../assets/Logo_shadow.svg";
import AuthButton from "./AuthButton";
import ModelSkeleton from "./ModelSkeleton"; // <-- Import skeleton cho phần Outlet

const HomeSkeleton = () => {
    return (
        // Sử dụng lại container chính của trang Home
        <div className="h-screen w-screen relative flex flex-col p-3 items-center bg-[#eaf5f2] overflow-hidden bg-opacity-100">
            {/* Các thành phần tĩnh được giữ lại để duy trì layout */}
            <img src={ellipseLeft} className="absolute top-0 left-0 w-[80px] md:w-[200px] z-10" />
            <img src={ellipseRight} className="absolute top-0 right-0 w-[80px] md:w-[200px]" />

            <AuthButton />

            {/* Skeleton cho phần thông tin bàn */}
            <div className="flex flex-col items-center z-20">
                <h1 className="text-3xl md:text-5xl mb-2 flex items-center gap-3">
                    TABLE:
                    <span className="w-24 h-9 md:w-36 md:h-12 bg-gray-400/50 rounded-md animate-pulse"></span>
                </h1>
                <img src={logo} alt="8ball" className="w-25 md:w-35 h-auto mb-0 md:mb-2" />
            </div>

            <ModelSkeleton />
        </div>
    );
};

export default HomeSkeleton;