import type React from 'react';

interface PrivateRouteProps {
    children: React.ReactElement[]; // hoặc ReactNode[] nếu cần
}

function PrivateRoute({ children }: PrivateRouteProps) {
    const role = localStorage.getItem('role');

    return (
        <div>
            {children[role === "STAFF" ? 1 : 0]}
        </div>
    );
}

export default PrivateRoute;
