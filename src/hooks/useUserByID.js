import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const client = axios.create({
    baseURL: "http://localhost:3000/api",
});

export default function useUserById() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await client.get(`/u/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")} `,
                    },
                });
                const userData = res.data;
                setUser(userData);
            } catch (err) {
                setError(err.response.data.error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [id]);

    return { user, loading, error };
}
