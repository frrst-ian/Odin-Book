import { Routes, Route } from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Users from "./components/Users/Users";
const AppRoutes = () => {
    return (
        <Routes>
            <Route path="r" element={<Register />} />
            <Route path="l" element={<Login />} />
            <Route path="users" element={<Users />} />
        </Routes>
    );
};

export default AppRoutes;
