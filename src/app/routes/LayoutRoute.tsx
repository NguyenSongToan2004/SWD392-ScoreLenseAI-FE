import { type ReactNode } from 'react';
import Header from '../layouts/Header';

interface PrivateRouteProps {
    children: ReactNode;
}

function LayoutRoute({ children }: PrivateRouteProps) {
    const isLoginPage = window.location.pathname === '/login'; // Kiểm tra nếu là trang đăng nhập
    return (
        <div className="w-screen h-screen flex flex-col">
            {!isLoginPage && <Header />}
            <div className="flex-1 overflow-hidden">{children}</div>
            {/* {!isLoginPage && <Footer />} */}
        </div>
    )
}

export default LayoutRoute
