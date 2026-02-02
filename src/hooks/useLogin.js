import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const client = axios.create({ baseURL: "http://localhost:3000/api" });

export default function useLogin() {
    const { login } = useContext(UserContext);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);

    const loginUser = async (email, password) => {
        try {
            setSubmitting(true);

            const response = await client.post("/auth/login", {
                email: email,
                password: password,
            });

            const userData = await response.data;
            login(userData.token, userData.user);
            navigate("/ww");
        } catch (err) {
            console.log(err.response)
            setError(err.response.data.error)
        } finally {
            setSubmitting(false);
        }
    };

    return { loginUser, error, submitting };
}
