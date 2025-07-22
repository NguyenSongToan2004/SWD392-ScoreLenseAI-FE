import { Outlet } from 'react-router-dom';

const StoreHome = () => {
    return (
        <div className="w-full">
            <Outlet />
        </div>
    );
};

export default StoreHome;
