import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageNotFound from "../layouts/PageNotFound";
import Admin from "../pages/Admin";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Match from "../pages/Match";
import PrivateRoute from "./PrivateRoute";

export default function MainRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={
                    // <LayoutRoute>
                    //     <Home />
                    // </LayoutRoute>} />
                    <Home />}
                />
                <Route path="/match" element={<Match />} />
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
