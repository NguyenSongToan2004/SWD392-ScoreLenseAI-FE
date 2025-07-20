import { Outlet } from 'react-router-dom';
import Header from '../layouts/Header';

function LayoutRoute() {
    const isLoginPage = window.location.pathname === '/login';
    return (
        <div className="w-screen h-screen flex flex-col">
            {!isLoginPage && <Header />}
            <div className="flex-1 overflow-hidden">
                <Outlet />
            </div>
        </div>
    )
}

export default LayoutRoute
