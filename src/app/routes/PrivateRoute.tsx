import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    children: ReactNode; // Explicitly define the type for children
}

function PrivateRoute({ children }: PrivateRouteProps) {
    if (!localStorage.getItem('auth')) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            {children}
        </div>
    );
}

export default PrivateRoute;
