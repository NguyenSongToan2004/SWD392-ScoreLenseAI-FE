// import type React from 'react';
// import { useEffect, useState } from 'react';
// import { Navigate } from 'react-router-dom';
// import { toast } from 'sonner';
// import { introspectAPI } from '../Utils/FetchCommonAPI';
// import type { Introspect } from '../models/ResponseAPI';

// interface PrivateRouteProps {
//     children: React.ReactElement[] | React.ReactElement;
// }

// function PrivateRoute({ children }: PrivateRouteProps) {
//     const [auth, setAuth] = useState<Introspect | null>(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const introspect = async () => {
//             const response = await introspectAPI();
//             if (response.status === 200) {
//                 setAuth(response.data);
//             } else {
//                 setAuth({ auth: false } as Introspect);
//             }
//             setLoading(false);
//         };
//         introspect();
//     }, []);

//     if (loading) {
//         toast.loading('Loading...');
//     }

//     if (!auth?.auth) {
//         toast.info('Please login !!');
//         return <Navigate to="/login" replace />;
//     }

//     return (
//         <div>
//             {Array.isArray(children)
//                 ? children[auth.role === 'STAFF' ? 1 : 0]
//                 : children}
//         </div>
//     );
// }

// export default PrivateRoute;


import type React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

interface PrivateRouteProps {
    children: React.ReactElement[] | React.ReactElement; // hoặc ReactNode[] nếu cần
}

function PrivateRoute({ children }: PrivateRouteProps) {
    const loc = useLocation();
    const role = localStorage.getItem('role');
    const isAuth = localStorage.getItem('isAuth');
    
    if (!isAuth || isAuth === "false") {
        // localStorage.setItem('returnURL', loc.pathname);
        toast.info('Please login !!');
        return <Navigate to={"/login"} replace />;
    }

    // Only check staffCreating for specific routes, not for role creation
    if (loc.pathname.includes('/create') && !loc.pathname.includes('/staff')) {
        return (
            <div>
                {Array.isArray(children) ?
                    children[role === "STAFF" ? 1 : 0] :
                    children
                }
            </div>
        );
    }

    let staffCreating: boolean = loc.state?.staffCreating;
    if (staffCreating) {
        return (
            <>
                {Array.isArray(children) ?
                    children[0] :
                    children
                }
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
