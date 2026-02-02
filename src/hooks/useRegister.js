import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const client = axios.create({ baseURL: "http://localhost:3000/api" });

export default function useRegister() {
    const { login } = useContext(UserContext);
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const registerUser = async (name, email, password, confirmPassword) => {
        try {
            setSubmitting(true);
            const response = await client.post("/auth/register", {
                name: name,
                email: email,
                password: password,
                confirmPassword: confirmPassword,
            });

            const userData = response.data;
            // console.log("userData:", userData);
            login(userData.token, userData.user);
            navigate("/w");
            return userData;
        } catch (err) {
            const errors = err.response.data.errors;
            console.log("Error:" , errors)
            setError(errors);
            setSubmitting(false);
        } finally {
            setSubmitting(false);
        }
    };
    return { registerUser, error, submitting };
}
