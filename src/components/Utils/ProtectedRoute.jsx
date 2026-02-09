import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(UserContext);
    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" replace />;
    return children;
};

export default ProtectedRoute;