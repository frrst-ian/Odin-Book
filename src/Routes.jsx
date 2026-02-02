import { Routes, Route } from "react-router-dom";
import Register from "./components/Register/Register";
const AppRoutes = () => {
    return (
        <Routes>
            <Route path="r" element={<Register />} />
        </Routes>
    );
};

export default AppRoutes;
