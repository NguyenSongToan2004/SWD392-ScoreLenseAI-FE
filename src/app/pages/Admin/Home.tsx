import { Outlet } from "react-router-dom";
import SideBar from "./partials/SideBar";

export default function Admin() {
    return (
        <div className="flex h-screen bg-gray-200 font-sans">
            {/* Sidebar sẽ chiếm một phần chiều rộng cố định */}
            <SideBar />

            {/* Khu vực nội dung chính, chiếm phần còn lại */}
            <main className="flex-1 p-8 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
}