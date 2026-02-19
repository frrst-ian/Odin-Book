import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const client = axios.create({ baseURL:import.meta.env.VITE_API_URL });

export default function useRegister() {
    const { login } = useContext(UserContext);
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const registerUser = async (form) => {
        try {
            setSubmitting(true);
            const response = await client.post("/auth/register", 
                form,
            );

            const userData = response.data;
            login(userData.token, userData.user);
            navigate("/posts");
            return userData;
        } catch (err) {
            const errors = err.response.data.errors;
            setError(errors);
            setSubmitting(false);
        } finally {
            setSubmitting(false);
        }
    };
    return { registerUser, error, submitting };
}
