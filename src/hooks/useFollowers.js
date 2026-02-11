import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const client = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")} ` },
});

export default function useFollowers() {
    const [userFollowers, setUserFollowers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        const fetchUserFollower = async () => {
            console.log("id:" , id)
            try {
                const res = await client.get(`/f/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")} `,
                    },
                });
                const userData = res.data;
                setUserFollowers(userData);
            } catch (err) {
                console.error(err.response.data);
                setError(err.response.data);
            } finally {
                setLoading(false);
            }
        };

        fetchUserFollower();
    }, []);

    return {
        userFollowers,
        loading,
        error,
    };
}
