import { useNavigate } from "react-router-dom";
import { Heart, CalendarFold, MoveLeft } from "lucide-react";
import usePostItem from "../../hooks/usePostItem";
import Nav from "../Nav/Nav";
import Comments from "../Comments/Comments";
import styles from "./post_item.module.css";

export default function PostItem() {
    const { post, loading, error, toggleLike } = usePostItem();
    const navigate = useNavigate();

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error.error}</div>;

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;

    return (
        <>
            <Nav />
            <div className={styles.postWrapper}>
                {post && (
                    <div className={styles.postItem}>
                        <div className={styles.top}>
                            <button
                                className={styles.backBtn}
                                onClick={() => navigate("/posts")}
                            >
                                <MoveLeft color="#8b5cf6" />
                            </button>
                        </div>
                        <div className={styles.user}>
                            <img
                                loading="eager"
                                className={styles.pfp}
                                src={post.author.profilePicture}
                            />
                            <p>{post.author.name}</p>
                        </div>
                        <div className={styles.dateWrapper}>
                            <CalendarFold width={20} />
                            <p className={styles.date}>
                                {new Date(post.createdAt).toLocaleDateString(
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
                        <p>{post.content}</p>
                        {post.postImage && (
                            <img
                                loading="eager"
                                className={styles.postImg}
                                src={post.postImage}
                            />
                        )}{" "}
                        <div className={styles.heart}>
                            {!user?.isGuest && (
                                <div className={styles.heartInfo}>
                                    <Heart
                                        height={28}
                                        width={28}
                                        className={
                                            post.likes.includes(userId)
                                                ? [
                                                      styles.heartIcon,
                                                      styles.active,
                                                  ].join(" ")
                                                : styles.heartIcon.active
                                        }
                                        onClick={() => toggleLike(post.id)}
                                    />
                                    <p>{post.likesCount}</p>
                                </div>
                            )}
                        </div>
                        <Comments postId={post.id} />
                    </div>
                )}
            </div>
        </>
    );
}
