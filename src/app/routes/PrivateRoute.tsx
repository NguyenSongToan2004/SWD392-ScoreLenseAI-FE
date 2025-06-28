import type React from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';

interface PrivateRouteProps {
    children: React.ReactElement[] | React.ReactElement; // hoặc ReactNode[] nếu cần
}

function PrivateRoute({ children }: PrivateRouteProps) {
    const role = localStorage.getItem('role');
    const isAuth = localStorage.getItem('isAuth');
    console.log("PrivateRoute rendered");
    if (!isAuth || isAuth === "false") {
        toast.info('Please login !!');
        return (
            <>
                <Navigate to={"/login"} replace/>
            </>
        )
    }

    return (
        <div>
            {Array.isArray(children) ?
                children[role === "STAFF" ? 1 : 0] :
                children
            }
        </div>
    );
}

export default PrivateRoute;

// import { Navigate, Outlet } from 'react-router-dom';
// import type { ReactElement } from 'react';

// interface PrivateRouteProps {
//     userElement: ReactElement;
//     staffElement: ReactElement;
// }

// function PrivateRoute({ userElement, staffElement }: PrivateRouteProps) {
//     const role = localStorage.getItem('role');
//     const isAuth = localStorage.getItem('isAuth');

//     console.log('PrivateRoute rendered');
//     console.log('isAuth:', isAuth);
//     console.log('role:', role);

//     if (!isAuth || isAuth === 'false') {
//         return <Navigate to="/login" replace />;
//     }

//     return (
//         <>
//             {role === 'STAFF' ? staffElement : userElement}
//             <Outlet /> {/* để load nested route như /:id, /team */}
//         </>
//     );
// }

// export default PrivateRoute;

