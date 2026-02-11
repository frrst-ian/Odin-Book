import { Routes, Route,Navigate } from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Users from "./components/Users/Users";
import UserByID from "./components/UserByID/UserByID";
import OAuthCallback from "./components/OAuthCallback/OAuthCallback"
import Followers from "./components/Followers/Followers"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="/" element={<Navigate to="login" replace />} />
            <Route path="users" element={<Users />} />
            <Route path="users/:id" element={<UserByID />} />
            <Route path="auth/callback" element={<OAuthCallback />} />
            <Route path="followers/:id" element={<Followers />} />
        </Routes>
    );
};

export default AppRoutes;
