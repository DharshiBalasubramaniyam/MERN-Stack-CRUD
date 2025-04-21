import React from "react";
import { Routes, Route, } from "react-router-dom";
import Home from "../pages/Home";
import { useSelector } from "react-redux";
import { refreshAccessToken } from "../config/api.config";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Phone from "../pages/Phone";

function AppContainer() {

    function ProtectedRoute({ children }) {
        const { isAuthenticated } = useSelector((state) => state.auth);
        console.log(isAuthenticated);
        if (!isAuthenticated) { // not logged in and token is required
            refreshAccessToken()
            .then((res) => {
                console.log(">>>> refreshed")
            });
        }
        return <>{children}</>;
    }

    return (
        <Routes>
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register/phone" element={<Phone />} />
        </Routes>
    );
}

export default AppContainer;
