import axios from "axios";
import { useState, useEffect } from "react";

const client = axios.create({
    baseURL: import.meta.env.API_URL,
});

export default function usePost() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [postSubmitting, setPostSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await client.get("/p", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")} `,
                    },
                });
                const postsData = res.data;
                setPosts(postsData);
            } catch (err) {
                console.error(err.response?.data);
                setError(err.response?.data);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const toggleLike = async (postId) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user.id;

        const prevPosts = posts;

        const post = posts.find((p) => p.id === postId);

        if (!post) return;

        const isLiked = post.likes.includes(userId);

        setPosts((prev) =>
            prev.map((p) =>
                p.id === postId
                    ? {
                          ...p,
                          likes: isLiked
                              ? p.likes.filter((id) => id !== userId)
                              : [...p.likes, userId],
                          likesCount: isLiked
                              ? p.likesCount - 1
                              : p.likesCount + 1,
                      }
                    : p,
            ),
        );

        try {
            if (isLiked) {
                await client.delete("/p/ul", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")} `,
                    },
                    data: { postId: postId },
                });
            } else {
                await client.post(
                    "/p/l",
                    { postId },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")} `,
                        },
                    },
                );
            }
        } catch (err) {
            console.error("Toggle like failed", err);
            setError(err?.response?.data || "Something went wrong");
            setPosts(prevPosts);
        }
    };

    const submitPost = async (form) => {
        try {
            setPostSubmitting(true);
            const res = await client.post(`/p`, form, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")} `,
                },
            });

            const newPost = res.data;
            setPosts([newPost, ...posts]);
        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setPostSubmitting(false);
        }
    };

    return { posts, loading, error, toggleLike, submitPost, postSubmitting };
}
