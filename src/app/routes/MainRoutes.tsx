import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageNotFound from "../layouts/PageNotFound";
import Admin from "../pages/Admin";
import Home from "../pages/Home";
import PrivateRoute from "./PrivateRoute";
import LayoutRoute from "./LayoutRoute";
import Login from "../pages/Login";

export default function MainRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/" element={
                    <LayoutRoute>
                        <Home />
                    </LayoutRoute>} />
                <Route path="/admin" element={
                    <PrivateRoute>
                        <Admin />
                    </PrivateRoute>
                } />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
