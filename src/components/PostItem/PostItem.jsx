import Nav from "../Nav/Nav";
import usePostItem from "../../hooks/usePostItem";
import styles from "./post_item.module.css";
import { Heart } from "lucide-react";

export default function Users() {
    const { post, loading, error, toggleLike } = usePostItem();

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
                        <div className={styles.user}>
                            <img
                                loading="eager"
                                className={styles.pfp}
                                src={post.author.profilePicture}
                            />
                            <p>{post.author.name}</p>
                        </div>
                        <small>
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
                        </small>
                        <p>{post.content}</p>
                        <img
                            loading="eager"
                            className={styles.postImg}
                            src={post.postImage}
                        />
                        <div className={styles.heart}>
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
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
