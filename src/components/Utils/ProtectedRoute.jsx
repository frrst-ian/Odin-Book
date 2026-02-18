import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, guestAllowed = false }) => {
    const { user, loading } = useContext(UserContext);
    if (loading) return <div className="loading" >Loading...</div>;
    if (!user) return <Navigate to="/login" replace />;
    if (!guestAllowed && user.isGuest) return <Navigate to="/posts" replace />;
    return children;
};

export default ProtectedRoute;
