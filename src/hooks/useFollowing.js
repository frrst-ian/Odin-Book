import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export default function useFollowing() {
    const [userFollowing, setUserFollowing] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        const fetchUserFollowing = async () => {
            try {
                const res = await client.get(`/f/following/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")} `,
                    },
                });
                const userFollowing = res.data;
                setUserFollowing(userFollowing);
                if (userFollowing.length === 0) {
                    setError("User doesn't follow anyone.");
                } else {
                    setError(null);
                }
            } catch (err) {
                console.error(err.response.data);
                setError(err.response.data);
            } finally {
                setLoading(false);
            }
        };

        fetchUserFollowing();
    }, [id]);

    return {
        userFollowing,
        loading,
        error,
    };
}
