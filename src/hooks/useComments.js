import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const client = axios.create({
    baseURL: import.meta.env.API_URL,
});

export default function useComments() {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await client.get(`/p/${id}/c`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")} `,
                    },
                });
                const comments = response.data;
                setComments(comments);
            } catch (err) {
                setError(err.data.response.error || "Something went wrong!");
            } finally {
                setLoading(false);
            }
        };
        fetchComments();
    }, [id]);

    const submitComment = async (postId, content) => {
        try {
            const res = await client.post(
                `/p/${postId}/c`,
                { content },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")} `,
                    },
                },
            );

            const newComments = res.data;
            setComments([...comments, newComments]);
        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return { comments, loading, error, submitComment };
}
