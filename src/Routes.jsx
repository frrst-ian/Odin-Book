import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Users from "./components/Users/Users";
import UserByID from "./components/UserByID/UserByID";
import OAuthCallback from "./components/OAuthCallback/OAuthCallback";
import Followers from "./components/Followers/Followers";
import Following from "./components/Following/Following";
import Posts from "./components/Posts/Posts";
import PostItem from "./components/PostItem/PostItem";
import ProtectedRoute from "./components/Utils/ProtectedRoute";
import NotFound from "./components/Utils/NotFound";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Navigate to="login" replace />} />
            <Route path="register" element={<Register  />} />
            <Route path="login" element={<Login />} />
            <Route path="auth/callback" element={<OAuthCallback />} />

            <Route
                path="users"
                element={
                    <ProtectedRoute>
                        <Users />
                    </ProtectedRoute>
                }
            />

            <Route
                path="users/:id"
                element={
                    <ProtectedRoute>
                        <UserByID />
                    </ProtectedRoute>
                }
            />
            <Route
                path="followers/:id"
                element={
                    <ProtectedRoute>
                        <Followers />
                    </ProtectedRoute>
                }
            />
            <Route
                path="following/:id"
                element={
                    <ProtectedRoute>
                        <Following />
                    </ProtectedRoute>
                }
            />

            <Route
                path="posts"
                element={
                    <ProtectedRoute guestAllowed>
                        <Posts />
                    </ProtectedRoute>
                }
            />
            <Route
                path="posts/:id"
                element={
                    <ProtectedRoute guestAllowed>
                        <PostItem />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
};

export default AppRoutes;
