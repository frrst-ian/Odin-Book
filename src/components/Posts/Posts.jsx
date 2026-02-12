import usePosts from "../../hooks/usePosts";
import Nav from "../Nav/Nav";
import styles from "./posts.module.css";

export default function Posts() {
    const { posts, error, loading } = usePosts();

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div>{error}</div>;

    if (posts.length === 0) {
        return <div>No posts currenetly available.</div>;
    }

    return (
        <>
            <Nav />
            <div className={styles.postWrapper}>
                <div className={styles.postList}>
                    {posts.map((p) => (
                        <div key={p.id} className={styles.postItem}>
                            <div className={styles.post}>
                                 <p>{p.name}</p>
                                <img
                                    decoding="async"
                                    loading="eager"
                                    className={styles.postImg}
                                    src={p.profilePicture}
                                />
                                <p>{p.content}</p>
                                <p>{p.createdAt}</p>
                                <img
                                    decoding="async"
                                    loading="eager"
                                    className={styles.postImg}
                                    src={p.postImage}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
