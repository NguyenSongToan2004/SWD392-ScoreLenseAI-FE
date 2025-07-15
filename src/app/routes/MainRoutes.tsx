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
import TableManagement from "../pages/Admin/usecases/TableManagement";
import TableView from "../pages/Admin/usecases/TableView";
import TableHome from "../pages/Admin/usecases/TableHome";
import TableEdit from "../pages/Admin/usecases/TableEdit";

export default function MainRoutes() {

    const Login = React.lazy(() => import('../pages/Login'));
    const Admin = React.lazy(() => import('../pages/Admin'))

    return (
        <BrowserRouter>
            <KeepAlivePing />
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/login" element={<Login />} />

                    <Route path="/"
                        element={
                            <PrivateRoute>
                                <Home />
                                <Login />
                            </PrivateRoute>
                        }
                    >
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
                        </Route>

                    </Route>
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </Suspense>
            <Toaster position="top-right" richColors closeButton />
        </BrowserRouter>
    );
}
