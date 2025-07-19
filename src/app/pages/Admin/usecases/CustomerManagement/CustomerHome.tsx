import { Outlet } from "react-router-dom";

const CustomerHome = () => {
    return (
        <div className="h-full">
            <Outlet />
        </div>
    );
};

export default CustomerHome;