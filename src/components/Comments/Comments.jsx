import styles from "./comments.module.css";
import { SendHorizontal } from "lucide-react";
import { useState } from "react";
import useComments from "../../hooks/useComments";

export default function Comments({ postId }) {
    const [comment, setComment] = useState("");

    const { comments, loading, error, submitComment } = useComments();

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error.error}</div>;

    const handleCommentSubmission = (formData) => {
        if (!comment.trim()) return;

        const postId = formData.get("id");

        submitComment(postId, comment);
        setComment("");
    };

    return (
        <>
            <div className={styles.commentsWrapper}>
                <p>Comments </p>
                {comments.map((c) => (
                    <div className={styles.commentInfo} key={c.id}>
                        <div className={styles.profilePicture}>
                            <img
                                loading="eager"
                                className={styles.pfp}
                                src={c.author.profilePicture}
                            />
                        </div>
                        <div className={styles.contentWrapper}>
                            <div className={styles.userInfo}>
                                <p>{c.author.name}</p>
                                <p className={styles.cDate}>
                                    {new Date(c.createdAt).toLocaleDateString(
                                        "en-US",
                                        {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                            hour: "numeric",
                                            minute: "numeric",
                                        },
                                    )}
                                </p>
                            </div>
                            <p className={styles.cContent}>{c.content}</p>
                        </div>
                    </div>
                ))}
                <form
                    className={styles.commentForm}
                    action={handleCommentSubmission}
                >
                    <input type="hidden" name="id" value={postId} />
                    <textarea
                        rows={"3"}
                        placeholder="Write your comments here..."
                        autoFocus
                        name="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className={styles.textarea}
                    ></textarea>
                    <button className={styles.sendBtn} type="submit">
                        <SendHorizontal color="#fefefe" fill="#fefefe" />
                    </button>
                </form>
            </div>
        </>
    );
}
