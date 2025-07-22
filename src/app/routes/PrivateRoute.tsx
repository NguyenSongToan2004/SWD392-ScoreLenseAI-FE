import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

function PrivateRoute() {
    const location = useLocation();
    // Lấy trạng thái đăng nhập từ localStorage (hoặc tốt hơn là từ state manager như Redux/Zustand)
    const isAuth = localStorage.getItem('isAuth') === 'true';

    if (!isAuth) {
        toast.info('Please login to continue!');
        console.log('Dang o : ' + location.pathname);
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }

    return <Outlet />;
}

export default PrivateRoute;
