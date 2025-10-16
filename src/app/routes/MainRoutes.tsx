// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import PageNotFound from "../layouts/PageNotFound";
// import Home from "../pages/Home";
// // import Login from "../pages/Login";
// import React, { Suspense } from "react";
// import { Toaster } from "sonner";
// import KeepAlivePing from "../components/KeepAlivePing";
// import DashBoard from "../pages/Admin/usecases/DashBoard";
// import ModeCreate from "../pages/Admin/usecases/Mode/ModeCreate";
// import ModeEdit from "../pages/Admin/usecases/Mode/ModeEdit";
// import ModeHome from "../pages/Admin/usecases/Mode/ModeHome";
// import ModeManagement from "../pages/Admin/usecases/Mode/ModeManagement";
// import ModeView from "../pages/Admin/usecases/Mode/ModeView";
// import PermissionCreate from "../pages/Admin/usecases/PermissionManagement/PermissionCreate";
// import PermissionHome from "../pages/Admin/usecases/PermissionManagement/PermissionHome";
// import PermissionManagement from "../pages/Admin/usecases/PermissionManagement/PermissionManagement";
// import PermissionView from "../pages/Admin/usecases/PermissionManagement/PermissionView";
// import PermissionAdd from "../pages/Admin/usecases/Role/PermissionAdd";
// import RoleCreate from "../pages/Admin/usecases/Role/RoleCreate";
// import RoleManagement from "../pages/Admin/usecases/Role/RoleManagement";
// import RoleView from "../pages/Admin/usecases/Role/RoleView";
// import StaffCreate from "../pages/Admin/usecases/StaffManagement/StaffCreate";
// import StaffEdit from "../pages/Admin/usecases/StaffManagement/StaffEdit";
// import StaffHome from "../pages/Admin/usecases/StaffManagement/StaffHome";
// import StaffManagement from "../pages/Admin/usecases/StaffManagement/StaffManagement";
// import StaffView from "../pages/Admin/usecases/StaffManagement/StaffView";
// import TableDetails from "../pages/Admin/usecases/TableDetails";
// import TableCreate from "../pages/Admin/usecases/TableManagement/TableCreate";
// import TableEdit from "../pages/Admin/usecases/TableManagement/TableEdit";
// import TableHome from "../pages/Admin/usecases/TableManagement/TableHome";
// import TableManagement from "../pages/Admin/usecases/TableManagement/TableManagement";
// import TableView from "../pages/Admin/usecases/TableManagement/TableView";
// import TeamList from "../pages/Home/partials/TeamList";
// import Model from "../pages/Home/usecases/Model";
// import Team from "../pages/Home/usecases/Team";
// import ForgetPassword from "../pages/Login/usecases/ForgetPassword";
// import ResetPassword from "../pages/Login/usecases/ResetPassword";
// import Match from "../pages/Match";
// import User from "../pages/User";
// import LayoutRoute from "./LayoutRoute";
// import PrivateRoute from "./PrivateRoute";

// import CustomerHome from "../pages/Admin/usecases/CustomerManagement/CustomerHome";
// import CustomerManagement from "../pages/Admin/usecases/CustomerManagement/CustomerManagement";
// import CustomerView from "../pages/Admin/usecases/CustomerManagement/CustomerView";
// import ProtectedLayout from "./ProtectedLayout";
// export default function MainRoutes() {

//     const Login = React.lazy(() => import('../pages/Login'));
//     const Admin = React.lazy(() => import('../pages/Admin'))

//     // return (
//     //     <BrowserRouter>
//     //         <KeepAlivePing />
//     //         <Suspense fallback={<div>Loading...</div>}>
//     //             <Routes>
//     //                 <Route path="/login" element={<Login />} />

//     //                 <Route path="/reset-password" element={<ResetPassword />} />

//     //                 <Route path="/forget-password" element={<ForgetPassword />} />

//     //                 <Route path="/" element={
//     //                         <Home />
//     //                 } >
//     //                     <Route path="/:id" element={<Model />} />
//     //                     <Route path="/team" element={<Team />} >
//     //                         <Route path="/team/list" element={<TeamList />} />
//     //                     </Route>
//     //                 </Route>

//     //                 <Route path="/match/:id" element={<Match />} />
//     //                 <Route path="/user" element={
//     //                     <LayoutRoute >
//     //                         <User />
//     //                     </LayoutRoute>
//     //                 } />
//     //                 <Route path="/admin" element={
//     //                     <PrivateRoute>
//     //                         <LayoutRoute>
//     //                             <Admin />
//     //                         </LayoutRoute>
//     //                     </PrivateRoute>
//     //                 } >
//     //                     <Route path="/admin/table" element={
//     //                         <PrivateRoute>
//     //                             <TableDetails />
//     //                         </PrivateRoute>
//     //                     } />

//     //                     <Route path="/admin/dashboard" element={
//     //                         <PrivateRoute>
//     //                             <DashBoard />
//     //                         </PrivateRoute>
//     //                     } />

//     //                     <Route path="/admin/table-management" element={
//     //                         <PrivateRoute>
//     //                             <TableHome />
//     //                         </PrivateRoute>
//     //                     } >
//     //                         <Route path="/admin/table-management/" element={
//     //                             <PrivateRoute>
//     //                                 <TableManagement />
//     //                             </PrivateRoute>
//     //                         } />
//     //                         <Route path="/admin/table-management/detail/:id" element={
//     //                             <PrivateRoute>
//     //                                 <TableView />
//     //                             </PrivateRoute>
//     //                         } />
//     //                         <Route path="/admin/table-management/edit/:id" element={
//     //                             <PrivateRoute>
//     //                                 <TableEdit />
//     //                             </PrivateRoute>
//     //                         } />
//     //                         <Route path="/admin/table-management/create" element={
//     //                             <PrivateRoute>
//     //                                 <TableCreate />
//     //                             </PrivateRoute>
//     //                         } />
//     //                     </Route>


//     //                     <Route path="/admin/mode-management" element={
//     //                         <PrivateRoute>
//     //                             <ModeHome />
//     //                         </PrivateRoute>
//     //                     } >
//     //                         <Route path="/admin/mode-management/" element={
//     //                             <PrivateRoute>
//     //                                 <ModeManagement />
//     //                             </PrivateRoute>
//     //                         } />
//     //                         <Route path="/admin/mode-management/detail/:id" element={
//     //                             <PrivateRoute>
//     //                                 <ModeView />
//     //                             </PrivateRoute>
//     //                         } />
//     //                         <Route path="/admin/mode-management/edit/:id" element={
//     //                             <PrivateRoute>
//     //                                 <ModeEdit />
//     //                             </PrivateRoute>
//     //                         } />
//     //                         <Route path="/admin/mode-management/create" element={
//     //                             <PrivateRoute>
//     //                                 <ModeCreate />
//     //                             </PrivateRoute>
//     //                         } />
//     //                     </Route>

//     //                     <Route path="/admin/staff-management" element={
//     //                         <PrivateRoute>
//     //                             <StaffHome />
//     //                         </PrivateRoute>
//     //                     } >
//     //                         <Route path="/admin/staff-management/" element={
//     //                             <PrivateRoute>
//     //                                 <StaffManagement />
//     //                             </PrivateRoute>
//     //                         } />
//     //                         <Route path="/admin/staff-management/detail/:id" element={
//     //                             <PrivateRoute>
//     //                                 <StaffView />
//     //                             </PrivateRoute>
//     //                         } />
//     //                         <Route path="/admin/staff-management/edit/:id" element={
//     //                             <PrivateRoute>
//     //                                 <StaffEdit />
//     //                             </PrivateRoute>
//     //                         } />
//     //                         <Route path="/admin/staff-management/create" element={
//     //                             <PrivateRoute>
//     //                                 <StaffCreate />
//     //                             </PrivateRoute>
//     //                         } />
//     //                     </Route>

//     //                     <Route path="/admin/customer-management" element={<CustomerHome />}>
//     //                         <Route index element={<CustomerManagement />} />
//     //                         <Route path="detail/:id" element={<CustomerView />} />
//     //                     </Route>

//     //                     <Route path="/admin/permission-management" element={
//     //                         <PrivateRoute>
//     //                             <PermissionHome />
//     //                         </PrivateRoute>
//     //                     } >
//     //                         <Route path="/admin/permission-management/" element={
//     //                             <PrivateRoute>
//     //                                 <PermissionManagement />
//     //                             </PrivateRoute>
//     //                         } />

//     //                         <Route path="/admin/permission-management/detail/:name" element={
//     //                             <PrivateRoute>
//     //                                 <PermissionView />
//     //                             </PrivateRoute>
//     //                         } />

//     //                         <Route path="/admin/permission-management/create" element={
//     //                             <PrivateRoute>
//     //                                 <PermissionCreate />
//     //                             </PrivateRoute>
//     //                         } />

//     //                     </Route>

//     //                     <Route path="/admin/role-management">
//     //                         <Route index element={<RoleManagement />} />
//     //                         <Route path="create" element={<RoleCreate />} />
//     //                         <Route path="detail/:name" element={<RoleView />} />
//     //                         <Route path="edit/:name" element={<PermissionAdd />} />
//     //                     </Route>
//     //                 </Route>
//     //                 <Route path="*" element={<PageNotFound />} />
//     //             </Routes>
//     //         </Suspense>
//     //         <Toaster position="top-right" richColors closeButton />
//     //     </BrowserRouter>
//     // );

//     return (
//         <BrowserRouter>
//             <KeepAlivePing />
//             <Suspense fallback={<div>Loading...</div>}>
//                 <Routes>
//                     <Route path="/login" element={<Login />} />
//                     <Route path="/forget-password" element={<ForgetPassword />} />
//                     <Route path="/reset-password" element={<ResetPassword />} />

//                     <Route element={<ProtectedLayout />}>
//                         <Route path="/" element={<Home />} />
//                         <Route path="/user" element={<User />} />
//                         <Route path="/match/:id" element={<Match />} />
//                     </Route>
//                 </Routes>
//             </Suspense>
//         </BrowserRouter>
//     )
// }

import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

// Components & Layouts
import PageNotFound from "../layouts/PageNotFound";
import LayoutRoute from "./LayoutRoute";
import PrivateRoute from "./PrivateRoute";
// import Admin from "../pages/Admin";
// import RequireRole from "./RequireRole";

// Lazy load các trang
const Login = React.lazy(() => import('../pages/Login'));
const ForgetPassword = React.lazy(() => import('../pages/Login/usecases/ForgetPassword'));
const ResetPassword = React.lazy(() => import('../pages/Login/usecases/ResetPassword'));
const Home = React.lazy(() => import('../pages/Home'));
const Model = React.lazy(() => import("../pages/Home/usecases/Model"));
const Team = React.lazy(() => import("../pages/Home/usecases/Team"));
const TeamList = React.lazy(() => import("../pages/Home/partials/TeamList"));
const Match = React.lazy(() => import('../pages/Match'));
const User = React.lazy(() => import('../pages/User'));
const Unauthorized = React.lazy(() => import("../layouts/Unauthorized"));

// Lazy load các trang Admin
// const DashBoard = React.lazy(() => import("../pages/Admin/usecases/DashBoard"));
// const TableDetails = React.lazy(() => import("../pages/Admin/usecases/TableDetails"));
// const TableHome = React.lazy(() => import("../pages/Admin/usecases/TableManagement/TableHome"));
// const TableManagement = React.lazy(() => import("../pages/Admin/usecases/TableManagement/TableManagement"));
// const TableView = React.lazy(() => import("../pages/Admin/usecases/TableManagement/TableView"));
// const TableEdit = React.lazy(() => import("../pages/Admin/usecases/TableManagement/TableEdit"));
// const TableCreate = React.lazy(() => import("../pages/Admin/usecases/TableManagement/TableCreate"));
// const ModeHome = React.lazy(() => import("../pages/Admin/usecases/Mode/ModeHome"));
// const ModeManagement = React.lazy(() => import("../pages/Admin/usecases/Mode/ModeManagement"));
// const ModeView = React.lazy(() => import("../pages/Admin/usecases/Mode/ModeView"));
// const ModeEdit = React.lazy(() => import("../pages/Admin/usecases/Mode/ModeEdit"));
// const ModeCreate = React.lazy(() => import("../pages/Admin/usecases/Mode/ModeCreate"));
// const StaffHome = React.lazy(() => import("../pages/Admin/usecases/StaffManagement/StaffHome"));
// const StaffManagement = React.lazy(() => import("../pages/Admin/usecases/StaffManagement/StaffManagement"));
// const StaffView = React.lazy(() => import("../pages/Admin/usecases/StaffManagement/StaffView"));
// const StaffEdit = React.lazy(() => import("../pages/Admin/usecases/StaffManagement/StaffEdit"));
// const StaffCreate = React.lazy(() => import("../pages/Admin/usecases/StaffManagement/StaffCreate"));
// const CustomerHome = React.lazy(() => import("../pages/Admin/usecases/CustomerManagement/CustomerHome"));
// const CustomerManagement = React.lazy(() => import("../pages/Admin/usecases/CustomerManagement/CustomerManagement"));
// const CustomerView = React.lazy(() => import("../pages/Admin/usecases/CustomerManagement/CustomerView"));
// const PermissionHome = React.lazy(() => import("../pages/Admin/usecases/PermissionManagement/PermissionHome"));
// const PermissionManagement = React.lazy(() => import("../pages/Admin/usecases/PermissionManagement/PermissionManagement"));
// const PermissionView = React.lazy(() => import("../pages/Admin/usecases/PermissionManagement/PermissionView"));
// const PermissionCreate = React.lazy(() => import("../pages/Admin/usecases/PermissionManagement/PermissionCreate"));
// const RoleHome = React.lazy(() => import("../pages/Admin/usecases/Role/RoleHome"));
// const RoleManagement = React.lazy(() => import("../pages/Admin/usecases/Role/RoleManagement"));
// const RoleCreate = React.lazy(() => import("../pages/Admin/usecases/Role/RoleCreate"));
// const RoleView = React.lazy(() => import("../pages/Admin/usecases/Role/RoleView"));
// const PermissionAdd = React.lazy(() => import("../pages/Admin/usecases/Role/PermissionAdd"));

// Lazy load Store Management components
// const StoreHome = React.lazy(() => import("../pages/Admin/StoreManagement/StoreHome"));
// const StoreManagement = React.lazy(() => import("../pages/Admin/StoreManagement/StoreManagement"));
// const StoreView = React.lazy(() => import("../pages/Admin/StoreManagement/StoreView"));
// const StoreEdit = React.lazy(() => import("../pages/Admin/StoreManagement/StoreEdit"));
// const StoreCreate = React.lazy(() => import("../pages/Admin/StoreManagement/StoreCreate"));

export default function MainRoutes() {
    return (
        <BrowserRouter>
            {/* <KeepAlivePing /> */}
            <Suspense fallback={<div className="flex h-screen w-full items-center justify-center">Loading...</div>}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/forget-password" element={<ForgetPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/unauthorized" element={<Unauthorized />} />

                    <Route element={<PrivateRoute />}>
                        <Route path="/" element={<Home />}>
                            <Route index path=":id" element={<Model />} />
                            <Route path="team" element={<Team />}>
                                <Route path="list" element={<TeamList />} />
                            </Route>
                        </Route>
                        <Route path="/match/:id" element={<Match />} />

                        <Route element={<LayoutRoute />}>
                            <Route path="/user" element={<User />} />
                            {/* <Route element={<RequireRole allowedRoles={['STAFF']} />}>
                                <Route path="/admin" element={<Admin />}>
                                    <Route index path="dashboard" element={<DashBoard />} />
                                    <Route path="table" element={<TableDetails />} />

                                    <Route path="table-management" element={<TableHome />}>
                                        <Route index element={<TableManagement />} />
                                        <Route path="detail/:id" element={<TableView />} />
                                        <Route path="edit/:id" element={<TableEdit />} />
                                        <Route path="create" element={<TableCreate />} />
                                    </Route>

                                    <Route path="mode-management" element={<ModeHome />}>
                                        <Route index element={<ModeManagement />} />
                                        <Route path="detail/:id" element={<ModeView />} />
                                        <Route path="edit/:id" element={<ModeEdit />} />
                                        <Route path="create" element={<ModeCreate />} />
                                    </Route>

                                    <Route path="staff-management" element={
                                        <StaffHome />
                                    }>
                                        <Route index element={<StaffManagement />} />
                                        <Route path="detail/:id" element={<StaffView />} />
                                        <Route path="edit/:id" element={<StaffEdit />} />
                                        <Route path="create" element={<StaffCreate />} />
                                    </Route>

                                    <Route path="customer-management" element={<CustomerHome />}>
                                        <Route index element={<CustomerManagement />} />
                                        <Route path="detail/:id" element={<CustomerView />} />
                                    </Route>

                                    <Route path="permission-management" element={<PermissionHome />}>
                                        <Route index element={<PermissionManagement />} />
                                        <Route path="detail/:name" element={<PermissionView />} />
                                        <Route path="create" element={<PermissionCreate />} />
                                    </Route>

                                    <Route path="role-management" element={<RoleHome />}>
                                        <Route index element={<RoleManagement />} />
                                        <Route path="create" element={<RoleCreate />} />
                                        <Route path="detail/:name" element={<RoleView />} />
                                        <Route path="edit/:name" element={<PermissionAdd />} />
                                    </Route>

                                    <Route path="store-management" element={<StoreHome />}>
                                        <Route index element={<StoreManagement />} />
                                        <Route path="detail/:id" element={<StoreView />} />
                                        <Route path="edit/:id" element={<StoreEdit />} />
                                        <Route path="create" element={<StoreCreate />} />
                                    </Route>
                                </Route>
                            </Route> */}
                        </Route>
                    </Route>

                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </Suspense>
            <Toaster position="top-right" richColors closeButton />
        </BrowserRouter>
    );
}
