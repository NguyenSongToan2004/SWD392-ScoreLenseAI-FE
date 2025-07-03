import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import ellipseLeft from "../../assets/Home_Ellipse_Left.png";
import ellipseRight from "../../assets/Home_Ellipse_Right.png";
import logo from "../../assets/Logo_shadow.svg";
import type ResponseAPI from "../../models/ResponseAPI";
import "./home.css";
import { isOpacityStore, matchSetUpStore } from "./homeStore";
// import type { BilliardTable } from "./models/DataObject";
import AuthButton from "./partials/AuthButton";
import { fetchTableAPI } from "./services/FetchAPI";
import { setDefaultMatchSetUp } from "./services/Function";
import HomeSkeleton from "./partials/HomeSkeleton"; // <-- 1. Import HomeSkeleton
import type { BilliardTable } from "../../models/DataObject";

export default function Home() {
    const isOpacity = isOpacityStore.use();
    const { id } = useParams();
    const [table, setTable] = useState<BilliardTable>();
    const [isLoading, setIsLoading] = useState(true); // <-- 2. Khởi tạo loading là true
    const nav = useNavigate();
    useEffect(() => {
        const getTable = async () => {
            // Đặt trong try-catch-finally để đảm bảo loading luôn được tắt

            const response: ResponseAPI = await fetchTableAPI(id as string) as ResponseAPI;
            console.log(response);
            if (response.status === 200) {
                let table = response.data as BilliardTable;
                if (table.status === "inUse" && table.matchResponse) {
                    nav(`/match/${table.matchResponse.billiardMatchID}`,
                        {
                            state: {
                                match: table.matchResponse
                            }
                        }
                    );
                }
                matchSetUpStore.set((prev) => {
                    prev.value = setDefaultMatchSetUp();
                });
                matchSetUpStore.set((prev) => {
                    prev.value.billiardTableID = table.billardTableID as string;
                });
                setTable(response.data);
            } else {
                window.alert('Có lỗi ' + response.message);
            }

            setIsLoading(false); // <-- 3. Tắt loading sau khi API hoàn tất
        }

        if (!id) {
            nav("/login");
            return;
        }
        getTable();
    }, []);

    // <-- 4. Render skeleton khi isLoading là true
    if (isLoading) {
        return <HomeSkeleton />;
    }

    return (
        <div className={`h-screen w-screen relative flex flex-col p-3 items-center bg-[#eaf5f2] overflow-hidden
                         ${isOpacity ? "bg-opacity-45" : "bg-opacity-100"}
        `}>
            {isOpacity && (
                <div className="absolute inset-0 bg-black opacity-30 z-50"></div>
            )}

            {/* <div className='z-100'>
                <matchSetUpStore.DevTool name="DevTool" />
            </div> */}

            {/* Ellipse Decor */}
            <img src={ellipseLeft} className="absolute top-0 left-0 w-[80px] md:w-[200px] z-10" />
            <img src={ellipseRight} className="absolute top-0 right-0 w-[80px] md:w-[200px]" />

            <AuthButton />

            {/* Table Info */}
            <div className="flex flex-col items-center z-20">
                <h1 className="text-3xl md:text-5xl mb-2">TABLE: {table?.tableCode}</h1>
                <img src={logo} alt="8ball" className="w-25 md:w-35 h-auto mb-0 md:mb-2" />
            </div>

            {table && table.status !== 'available'
                ?
                <h2
                    className="text-md text-center text-wrap md:text-3xl text-black"
                >
                    {`This table is in ${table.status} now ! Please go to another table or ask for our staff !!`}
                </h2>
                :
                <Outlet />
            }
        </div>
    );
}