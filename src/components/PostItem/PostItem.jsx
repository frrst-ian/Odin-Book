import Nav from "../Nav/Nav";
import usePostItem from "../../hooks/usePostItem";
import styles from "./post_item.module.css";
import { Heart, CalendarFold } from "lucide-react";
import Comments from "../Comments/Comments";

export default function PostItem() {
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
                        <Comments
                            // key={post.comments.id}
                            // comments={post.comments}
                            postId={post.id}
                        />
                    </div>
                )}
            </div>
        </>
    );
}
