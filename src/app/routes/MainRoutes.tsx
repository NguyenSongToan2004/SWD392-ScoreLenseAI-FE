import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageNotFound from "../layouts/PageNotFound";
import Admin from "../pages/Admin";
import Home from "../pages/Home";
// import Login from "../pages/Login";
import Match from "../pages/Match";
import User from "../pages/User";
import PrivateRoute from "./PrivateRoute";
import LayoutRoute from "./LayoutRoute";
import KeepAlivePing from "../components/KeepAlivePing";
import React, { Suspense } from "react";

export default function MainRoutes() {

    const Login = React.lazy(() => import('../pages/Login'));

    return (
        <BrowserRouter>
            <KeepAlivePing />
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={
                        <Home />}
                    />
                    <Route path="/match" element={<Match />} />
                    <Route path="/user" element={
                        <LayoutRoute >
                            <User />
                        </LayoutRoute>
                    } />
                    <Route path="/admin" element={
                        <PrivateRoute>
                            <Admin />
                        </PrivateRoute>
                    } />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}
