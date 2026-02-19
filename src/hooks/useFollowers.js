import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client } from "../helpers/axiosClient";

export default function useFollowers() {
    const [userFollowers, setUserFollowers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        const fetchUserFollower = async () => {
            try {
                const res = await client.get(`/f/follower/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")} `,
                    },
                });
                const userFollowers = res.data;
                setUserFollowers(userFollowers);
                if (userFollowers.length === 0) {
                    setError("User has no follower.");
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

        fetchUserFollower();
    }, [id]);

    return {
        userFollowers,
        loading,
        error,
    };
}
