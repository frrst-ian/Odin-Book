import { NavLink } from "react-router-dom";
import usePosts from "../../hooks/usePosts";
import Nav from "../Nav/Nav";
import styles from "./posts.module.css";
import { Heart, MessageSquare } from "lucide-react";

export default function Posts() {
    const { toggleLike, posts, error, loading } = usePosts();

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div>{error}</div>;

    if (posts.length === 0) {
        return <div>No posts currently available.</div>;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;

    return (
        <>
            <Nav />
            <div className={styles.postWrapper}>
                <div className={styles.postList}>
                    {posts.map((p) => (
                        <div key={p.id} className={styles.postItem}>
                            <div className={styles.post}>
                                <div className={styles.user}>
                                    <img
                                        loading="eager"
                                        className={styles.pfp}
                                        src={p.profilePicture}
                                    />
                                    <p>{p.name}</p>
                                </div>
                                <small>
                                    {new Date(p.createdAt).toLocaleDateString(
                                        "en-US",
                                        {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                            hour: "numeric",
                                            minute: "numeric",
                                        },
                                    )}
                                </small>
                                <p>{p.content}</p>
                                <img
                                    loading="eager"
                                    className={styles.postImg}
                                    src={p.postImage}
                                />
                                <div className={styles.heart}>
                                    <div className={styles.heartInfo}>
                                        <Heart
                                            height={28}
                                            width={28}
                                            className={
                                                p.likes.includes(userId)
                                                    ? [
                                                          styles.heartIcon,
                                                          styles.active,
                                                      ].join(" ")
                                                    : styles.heartIcon.active
                                            }
                                            onClick={() => toggleLike(p.id)}
                                        />
                                        <p>{p.likesCount}</p>
                                    </div>
                                    <NavLink
                                        className={styles.commentBtnWrapper}
                                        to={`/posts/${p.id}`}
                                    >
                                        <MessageSquare
                                            className={styles.commentsIcon}
                                        />
                                        Comments
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
