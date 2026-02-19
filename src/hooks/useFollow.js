import { useState, useEffect } from "react";
import axios from "axios";

const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

client.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default function useFollow() {
    const [userFollowing, setUserFollowing] = useState([]);

    useEffect(() => {
        const fetchUserFollowing = async () => {
            try {
                const res = await client.get("/f", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")} `,
                    },
                });
                const userFollowing = res.data;
                setUserFollowing(userFollowing);
            } catch (err) {
                console.error(err.response.data.error);
            }
        };

        fetchUserFollowing();
    }, []);

    const toggleFollow = async (userId) => {
        try {
            const isFollowing = userFollowing.some(
                (user) => user.id === userId,
            );

            if (isFollowing) {
                await client.delete("/f", {
                    data: { followedUserID: userId },
                });
                setUserFollowing((prev) =>
                    prev.filter((user) => user.id !== userId),
                );
            } else {
                await client.post("/f", {
                    followedUserID: userId,
                });
                const res = await client.get("/f", {});
                setUserFollowing(res.data);
            }
        } catch (err) {
            console.error("Follow failed", err);
        }
    };

    return {
        userFollowing,
        toggleFollow,
    };
}
