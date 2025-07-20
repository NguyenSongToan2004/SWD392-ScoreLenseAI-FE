import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

interface RequireRoleProps {
    allowedRoles: string[]; // Mảng chứa các role được phép, ví dụ: ['ADMIN', 'STAFF']
}

function RequireRole({ allowedRoles }: RequireRoleProps) {
    const location = useLocation();
    const userRole = localStorage.getItem('role');

    const isAllowed = userRole && allowedRoles.includes(userRole);

    if (!isAllowed) {
        toast.error("You do not have permission to access this page.");
        const destination = location.pathname;
        return <Navigate to={`${destination}`} replace />;
    }
    
    return <Outlet />;
}

export default RequireRole;