import { useState, useEffect } from "react";
import axios from "axios";

const client = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")} ` },
});

export default function useFollow() {
    const [userFollowing, setUserFollowing] = useState([]);

    useEffect(() => {
        const fetchUserFollowing = async () => {
            try {
                const res = await client.get("/f/fw");
                const userData = res.data;
                setUserFollowing(userData);
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
                await client.delete("/f", { data: { followedUserID: userId } });
                setUserFollowing((prev) =>
                    prev.filter((user) => user.id !== userId),
                );
            } else {
                await client.post("/f", { followedUserID: userId });
                const res = await client.get("/f/fw");
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
