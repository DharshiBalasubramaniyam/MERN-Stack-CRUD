import React from "react";
import { Routes, Route, } from "react-router-dom";
import Home from "../pages/Home";
import { useDispatch, useSelector } from "react-redux";
import { refreshAccessToken } from "../config/api.config";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Phone from "../pages/Phone";
import Info from "../components/Info";

function AppContainer() {

    function ProtectedRoute({ children }) {
        const { isAuthenticated } = useSelector((state) => state.auth);
        const [loading, setLoading] = React.useState(true);
        const dispatch = useDispatch();
    
        React.useEffect(() => {
            const checkAuth = async () => {
                if (!isAuthenticated) {
                    try {
                        await refreshAccessToken(dispatch);
                    } catch (err) {
                        console.error("Token refresh failed");
                    }
                }
                setLoading(false);
            };
            checkAuth();
        }, [isAuthenticated]);
    
        if (loading) {
            return <Info message="Loading..."/>; 
        }
    
        return <>{children}</>;
    }
    

    return (
        <Routes>
            <Route path="/" element={
                <ProtectedRoute>
                    <Home />
                </ProtectedRoute>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register/phone" element={<Phone />} />
        </Routes>
    );
}

export default AppContainer;
