import { type ReactNode } from 'react';
import Footer from '../layouts/Footer';
import Header from '../layouts/Header';

interface PrivateRouteProps {
    children: ReactNode;
}

function LayoutRoute({children} : PrivateRouteProps) {
    const isLoginPage = window.location.pathname === '/login'; // Kiểm tra nếu là trang đăng nhập
    return (
        <div>
            {!isLoginPage && <Header />}
            <main>{children}</main>
            {!isLoginPage && <Footer />}
        </div>
    )
}

export default LayoutRoute
