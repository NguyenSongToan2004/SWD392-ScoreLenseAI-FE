import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageNotFound from "../layouts/PageNotFound";
import Home from "../pages/Home";
// import Login from "../pages/Login";
import React, { Suspense } from "react";
import { Toaster } from "sonner";
import KeepAlivePing from "../components/KeepAlivePing";
import DashBoard from "../pages/Admin/usecases/DashBoard";
import TableDetails from "../pages/Admin/usecases/TableDetails";
import TeamList from "../pages/Home/partials/TeamList";
import Model from "../pages/Home/usecases/Model";
import Team from "../pages/Home/usecases/Team";
import Match from "../pages/Match";
import User from "../pages/User";
import LayoutRoute from "./LayoutRoute";
import PrivateRoute from "./PrivateRoute";
import TableManagement from "../pages/Admin/usecases/TableManagement/TableManagement";
import TableView from "../pages/Admin/usecases/TableManagement/TableView";
import TableHome from "../pages/Admin/usecases/TableManagement/TableHome";
import TableEdit from "../pages/Admin/usecases/TableManagement/TableEdit";
import TableCreate from "../pages/Admin/usecases/TableManagement/TableCreate";
import ModeHome from "../pages/Admin/usecases/Mode/ModeHome";
import ModeManagement from "../pages/Admin/usecases/Mode/ModeManagement";
import ModeView from "../pages/Admin/usecases/Mode/ModeView";
import ModeEdit from "../pages/Admin/usecases/Mode/ModeEdit";
import ModeCreate from "../pages/Admin/usecases/Mode/ModeCreate";
import StaffHome from "../pages/Admin/usecases/StaffManagement/StaffHome";
import StaffManagement from "../pages/Admin/usecases/StaffManagement/StaffManagement";
import StaffView from "../pages/Admin/usecases/StaffManagement/StaffView";
import StaffEdit from "../pages/Admin/usecases/StaffManagement/StaffEdit";
import StaffCreate from "../pages/Admin/usecases/StaffManagement/StaffCreate";
import PermissionHome from "../pages/Admin/usecases/PermissionManagement/PermissionHome";
import PermissionManagement from "../pages/Admin/usecases/PermissionManagement/PermissionManagement";
import PermissionView from "../pages/Admin/usecases/PermissionManagement/PermissionView";
import PermissionCreate from "../pages/Admin/usecases/PermissionManagement/PermissionCreate";
import RoleHome from "../pages/Admin/usecases/Role/RoleHome";
import RoleManagement from "../pages/Admin/usecases/Role/RoleManagement";
import RoleView from "../pages/Admin/usecases/Role/RoleView";
import PermissionAdd from "../pages/Admin/usecases/Role/PermissionAdd";
import ResetPassword from "../pages/Login/usecases/ResetPassword";
import ForgetPassword from "../pages/Login/usecases/ForgetPassword";

import CustomerHome from "../pages/Admin/usecases/CustomerManagement/CustomerHome";
import CustomerManagement from "../pages/Admin/usecases/CustomerManagement/CustomerManagement";
import CustomerView from "../pages/Admin/usecases/CustomerManagement/CustomerView";
export default function MainRoutes() {

    const Login = React.lazy(() => import('../pages/Login'));
    const Admin = React.lazy(() => import('../pages/Admin'))

    return (
        <BrowserRouter>
            <KeepAlivePing />
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/login" element={<Login />} />

                    <Route path="/reset-password" element={<ResetPassword />} />

                    <Route path="/forget-password" element={<ForgetPassword />} />

                    <Route path="/" element={
                            <Home />
                    } >
                        <Route path="/:id" element={<Model />} />
                        <Route path="/team" element={<Team />} >
                            <Route path="/team/list" element={<TeamList />} />
                        </Route>
                    </Route>

                    <Route path="/match/:id" element={<Match />} />
                    <Route path="/user" element={
                        <LayoutRoute >
                            <User />
                        </LayoutRoute>
                    } />
                    <Route path="/admin" element={
                        <PrivateRoute>
                            <LayoutRoute>
                                <Admin />
                            </LayoutRoute>
                        </PrivateRoute>
                    } >
                        <Route path="/admin/table" element={
                            <PrivateRoute>
                                <TableDetails />
                            </PrivateRoute>
                        } />

                        <Route path="/admin/dashboard" element={
                            <PrivateRoute>
                                <DashBoard />
                            </PrivateRoute>
                        } />

                        <Route path="/admin/table-management" element={
                            <PrivateRoute>
                                <TableHome />
                            </PrivateRoute>
                        } >
                            <Route path="/admin/table-management/" element={
                                <PrivateRoute>
                                    <TableManagement />
                                </PrivateRoute>
                            } />
                            <Route path="/admin/table-management/detail/:id" element={
                                <PrivateRoute>
                                    <TableView />
                                </PrivateRoute>
                            } />
                            <Route path="/admin/table-management/edit/:id" element={
                                <PrivateRoute>
                                    <TableEdit />
                                </PrivateRoute>
                            } />
                            <Route path="/admin/table-management/create" element={
                                <PrivateRoute>
                                    <TableCreate />
                                </PrivateRoute>
                            } />
                        </Route>


                        <Route path="/admin/mode-management" element={
                            <PrivateRoute>
                                <ModeHome />
                            </PrivateRoute>
                        } >
                            <Route path="/admin/mode-management/" element={
                                <PrivateRoute>
                                    <ModeManagement />
                                </PrivateRoute>
                            } />
                            <Route path="/admin/mode-management/detail/:id" element={
                                <PrivateRoute>
                                    <ModeView />
                                </PrivateRoute>
                            } />
                            <Route path="/admin/mode-management/edit/:id" element={
                                <PrivateRoute>
                                    <ModeEdit />
                                </PrivateRoute>
                            } />
                            <Route path="/admin/mode-management/create" element={
                                <PrivateRoute>
                                    <ModeCreate />
                                </PrivateRoute>
                            } />
                        </Route>

                        <Route path="/admin/staff-management" element={
                            <PrivateRoute>
                                <StaffHome />
                            </PrivateRoute>
                        } >
                            <Route path="/admin/staff-management/" element={
                                <PrivateRoute>
                                    <StaffManagement />
                                </PrivateRoute>
                            } />
                            <Route path="/admin/staff-management/detail/:id" element={
                                <PrivateRoute>
                                    <StaffView />
                                </PrivateRoute>
                            } />
                            <Route path="/admin/staff-management/edit/:id" element={
                                <PrivateRoute>
                                    <StaffEdit />
                                </PrivateRoute>
                            } />
                            <Route path="/admin/staff-management/create" element={
                                <PrivateRoute>
                                    <StaffCreate />
                                </PrivateRoute>
                            } />
                        </Route>

                        <Route path="/admin/customer-management" element={<CustomerHome />}>
                            <Route index element={<CustomerManagement />} />
                            <Route path="detail/:id" element={<CustomerView />} />
                        </Route>

                        <Route path="/admin/permission-management" element={
                            <PrivateRoute>
                                <PermissionHome />
                            </PrivateRoute>
                        } >
                            <Route path="/admin/permission-management/" element={
                                <PrivateRoute>
                                    <PermissionManagement />
                                </PrivateRoute>
                            } />

                            <Route path="/admin/permission-management/detail/:name" element={
                                <PrivateRoute>
                                    <PermissionView />
                                </PrivateRoute>
                            } />

                            <Route path="/admin/permission-management/create" element={
                                <PrivateRoute>
                                    <PermissionCreate />
                                </PrivateRoute>
                            } />

                        </Route>

                        <Route path="/admin/role-management" element={
                            <PrivateRoute>
                                <RoleHome />
                            </PrivateRoute>
                        } >
                            <Route path="/admin/role-management/" element={
                                <PrivateRoute>
                                    <RoleManagement />
                                </PrivateRoute>
                            } />

                            <Route path="/admin/role-management/detail/:name" element={
                                <PrivateRoute>
                                    <RoleView />
                                </PrivateRoute>
                            } />

                            <Route path="/admin/role-management/create" element={
                                <PrivateRoute>
                                    <PermissionAdd />
                                </PrivateRoute>
                            } />
                        </Route>
                    </Route>
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </Suspense>
            <Toaster position="top-right" richColors closeButton />
        </BrowserRouter>
    );
}
