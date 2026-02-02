import { Routes, Route } from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login"
const AppRoutes = () => {
    return (
        <Routes>
            <Route path="r" element={<Register />} />
            <Route path="l" element={<Login />} />

        </Routes>
    );
};

export default AppRoutes;
