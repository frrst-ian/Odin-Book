import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const client = axios.create({
    baseURL: import.meta.env.API_URL,
});

export default function usePostItem() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await client.get(`/p/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")} `,
                    },
                });
                const postData = response.data;
                setPost(postData);
            } catch (err) {
                setError(err.data.response.error || "Something went wrong!");
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    const toggleLike = async (postId) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user.id;

        const prevPost = post;

        const isLiked = post.likes.includes(userId);

        setPost({
            ...post,
            likes: isLiked
                ? post.likes.filter((id) => id !== userId)
                : [...post.likes, userId],
            likesCount: isLiked ? post.likesCount - 1 : post.likesCount + 1,
        });

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
            setPost(prevPost);
        }
    };

    const submitComment = async (postId, content) => {
        try {
            await client.post(
                `/p/${postId}/c`,
                { content },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")} `,
                    },
                },
            );
        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return { post, loading, error, toggleLike, submitComment };
}
