import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import ellipseLeft from "../../assets/Home_Ellipse_Left.png";
import ellipseRight from "../../assets/Home_Ellipse_Right.png";
import logo from "../../assets/Logo_shadow.svg";
import type ResponseAPI from "../../models/ResponseAPI";
import "./home.css";
import { isOpacityStore, matchSetUpStore } from "./homeStore";
import type { BilliardTable } from "./models/DataObject";
import AuthButton from "./partials/AuthButton";
import { fetchTableAPI } from "./services/FetchAPI";

export default function Home() {
    const isOpacity = isOpacityStore.use();
    const { id } = useParams();

    useEffect(() => {
        const getTable = async () => {
            const response: ResponseAPI = await fetchTableAPI(id as string) as ResponseAPI;
            console.log(response);
            if (response.status === 200) {
                let table = response.data as BilliardTable;
                console.log(table);
                console.log(table.billardTableID);
                matchSetUpStore.set((prev) => {
                    prev.value.billiardTableID = table.billardTableID as string;
                });
            } else {
                window.alert('Có lỗi ' + response.message);
            }
        }

        getTable();
    }, []);

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

            <AuthButton />

            {/* Table Info */}
            <div className="flex flex-col items-center">
                <h1 className="md:text-5xl mb-4">TABLE: 01</h1>
                <img src={logo} alt="8ball" className="w-35 h-auto mb-2" />
            </div>

            <Outlet />
        </div>
    );
}
