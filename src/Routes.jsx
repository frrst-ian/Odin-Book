import { Routes, Route } from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Users from "./components/Users/Users";
import UserByID from "./components/UserByID/UserByID";
import OAuthCallback from "./hooks/useOAuthCallback"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="users" element={<Users />} />
            <Route path="users/:id" element={<UserByID />} />
            <Route path="auth/callback" element={<OAuthCallback />} />
        </Routes>
    );
};

export default AppRoutes;
