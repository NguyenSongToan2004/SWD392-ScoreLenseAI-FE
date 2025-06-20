import { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import logInIcon from "../../assets/BiLogInCircle.svg";
import ellipseLeft from "../../assets/Home_Ellipse_Left.png";
import ellipseRight from "../../assets/Home_Ellipse_Right.png";
import logo from "../../assets/Logo_shadow.svg";
import "./home.css";
import { isOpacityStore, matchSetUpStore } from "./homeStore";

export default function Home() {
    const isOpacity = isOpacityStore.use();
    const { id } = useParams();
    const nav = useNavigate();

    useEffect(() => {

        const getTable = async () => {
            // await fetchModeTestAPI(1);
            // const response: ResponseAPI = await fetchTableAPI(id as string) as ResponseAPI;
            // if (response.status == 200) {
            //     let table = response.data as BilliardTable;

            // }
            matchSetUpStore.set((prev) => {
                prev.value.billiardTableID = id as string;
            });
        }

        getTable();
    }, []);

    const handleLogin = () => {
        nav("/login")
    }

    return (
        <div className={`h-screen w-screen relative flex flex-col  p-5 items-center bg-[#eaf5f2] overflow-hidden
                        ${isOpacity ? "bg-opacity-45" : "bg-opacity-100"}
        `}>
            {isOpacity && (
                <div className="absolute inset-0 bg-black opacity-30 z-50"></div>
            )}

            <div className='z-100'>
                <matchSetUpStore.DevTool name="DevTool" />
            </div>

            {/* Ellipse Decor */}
            <img src={ellipseLeft} className="absolute top-0 left-0 w-[120px] md:w-[200px]" />
            <img src={ellipseRight} className="absolute top-0 right-0 w-[120px] md:w-[200px]" />

            <button
                className="absolute top-5 right-5 text-button px-3 py-1 text-xl
                 rounded-sm flex flex-row flex-nowrap gap-1 items-center cursor-pointer"
                onClick={handleLogin}
            >
                <h5 className="text-2xl font-thin">LOGIN</h5>
                <img src={logInIcon} alt="Next Icon" />
            </button>

            {/* Table Info */}
            <div className="flex flex-col items-center">
                <h1 className="md:text-5xl mb-4">TABLE: 01</h1>
                <img src={logo} alt="8ball" className="w-35 h-auto mb-2" />
            </div>

            <Outlet />
        </div>
    );
}
