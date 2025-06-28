import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageNotFound from "../layouts/PageNotFound";
import Home from "../pages/Home";
// import Login from "../pages/Login";
import React, { Suspense } from "react";
import KeepAlivePing from "../components/KeepAlivePing";
import Model from "../pages/Home/usecases/Model";
import Team from "../pages/Home/usecases/Team";
import TeamList from "../pages/Home/partials/TeamList";
import Match from "../pages/Match";
import User from "../pages/User";
import LayoutRoute from "./LayoutRoute";
import PrivateRoute from "./PrivateRoute";
import { Toaster } from "sonner";
import TableDetails from "../pages/Admin/usecases/TableDetails";
import DashBoard from "../pages/Admin/usecases/DashBoard";

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

                    </Route>
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </Suspense>
            <Toaster position="top-right" richColors closeButton />
        </BrowserRouter>
    );
}
