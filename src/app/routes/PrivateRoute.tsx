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