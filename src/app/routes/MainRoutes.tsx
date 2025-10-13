import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

// Components & Layouts
import KeepAlivePing from "../components/KeepAlivePing";
import PageNotFound from "../layouts/PageNotFound";
import PrivateRoute from "./PrivateRoute";
import LayoutRoute from "./LayoutRoute";
import RequireRole from "./RequireRole";
import Admin from "../pages/Admin";
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
const DashBoard = React.lazy(() => import("../pages/Admin/usecases/DashBoard"));
const TableDetails = React.lazy(() => import("../pages/Admin/usecases/TableDetails"));
const TableHome = React.lazy(() => import("../pages/Admin/usecases/TableManagement/TableHome"));
const TableManagement = React.lazy(() => import("../pages/Admin/usecases/TableManagement/TableManagement"));
const TableView = React.lazy(() => import("../pages/Admin/usecases/TableManagement/TableView"));
const TableEdit = React.lazy(() => import("../pages/Admin/usecases/TableManagement/TableEdit"));
const TableCreate = React.lazy(() => import("../pages/Admin/usecases/TableManagement/TableCreate"));
const ModeHome = React.lazy(() => import("../pages/Admin/usecases/Mode/ModeHome"));
const ModeManagement = React.lazy(() => import("../pages/Admin/usecases/Mode/ModeManagement"));
const ModeView = React.lazy(() => import("../pages/Admin/usecases/Mode/ModeView"));
const ModeEdit = React.lazy(() => import("../pages/Admin/usecases/Mode/ModeEdit"));
const ModeCreate = React.lazy(() => import("../pages/Admin/usecases/Mode/ModeCreate"));
const StaffHome = React.lazy(() => import("../pages/Admin/usecases/StaffManagement/StaffHome"));
const StaffManagement = React.lazy(() => import("../pages/Admin/usecases/StaffManagement/StaffManagement"));
const StaffView = React.lazy(() => import("../pages/Admin/usecases/StaffManagement/StaffView"));
const StaffEdit = React.lazy(() => import("../pages/Admin/usecases/StaffManagement/StaffEdit"));
const StaffCreate = React.lazy(() => import("../pages/Admin/usecases/StaffManagement/StaffCreate"));
const CustomerHome = React.lazy(() => import("../pages/Admin/usecases/CustomerManagement/CustomerHome"));
const CustomerManagement = React.lazy(() => import("../pages/Admin/usecases/CustomerManagement/CustomerManagement"));
const CustomerView = React.lazy(() => import("../pages/Admin/usecases/CustomerManagement/CustomerView"));
const PermissionHome = React.lazy(() => import("../pages/Admin/usecases/PermissionManagement/PermissionHome"));
const PermissionManagement = React.lazy(() => import("../pages/Admin/usecases/PermissionManagement/PermissionManagement"));
const PermissionView = React.lazy(() => import("../pages/Admin/usecases/PermissionManagement/PermissionView"));
const PermissionCreate = React.lazy(() => import("../pages/Admin/usecases/PermissionManagement/PermissionCreate"));
const RoleHome = React.lazy(() => import("../pages/Admin/usecases/Role/RoleHome"));
const RoleManagement = React.lazy(() => import("../pages/Admin/usecases/Role/RoleManagement"));
const RoleCreate = React.lazy(() => import("../pages/Admin/usecases/Role/RoleCreate"));
const RoleView = React.lazy(() => import("../pages/Admin/usecases/Role/RoleView"));
const PermissionAdd = React.lazy(() => import("../pages/Admin/usecases/Role/PermissionAdd"));

// Lazy load Store Management components
const StoreHome = React.lazy(() => import("../pages/Admin/usecases/StoreManagement/StoreHome"));
const StoreManagement = React.lazy(() => import("../pages/Admin/usecases/StoreManagement/StoreManagement"));
const StoreView = React.lazy(() => import("../pages/Admin/usecases/StoreManagement/StoreView"));
const StoreEdit = React.lazy(() => import("../pages/Admin/usecases/StoreManagement/StoreEdit"));
const StoreCreate = React.lazy(() => import("../pages/Admin/usecases/StoreManagement/StoreCreate"));

export default function MainRoutes() {
    return (
        <BrowserRouter>
            <KeepAlivePing />
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
                            <Route element={<RequireRole allowedRoles={['STAFF']} />}>
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
                            </Route>
                        </Route>
                    </Route>

                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </Suspense>
            <Toaster position="top-right" richColors closeButton />
        </BrowserRouter>
    );
}
