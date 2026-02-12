import axios from "axios";
import { useState, useEffect } from "react";

const client = axios.create({
    baseURL: "http://localhost:3000/api",
});

export default function usePost() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await client.get("/p", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")} `,
                    },
                });
                const userData = res.data;
                setPosts(userData);
            } catch (err) {
                console.error(err.response.data);
                setError(err.response.data);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return { posts, loading, error };
}
