import { NavLink } from "react-router-dom";
import usePosts from "../../hooks/usePosts";
import Nav from "../Nav/Nav";
import styles from "./posts.module.css";
import { Heart, MessageSquare, ImageUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function Posts() {
    const { toggleLike, posts, error, loading, submitPost, postSubmitting } =
        usePosts();
    const [postContent, setPostContent] = useState("");
    const [file, setSelectedFile] = useState(null);

    const [filePrev, setFilePrev] = useState(null);

    useEffect(() => {
        const filePreview = () => {
            if (!file) return;
            const reader = new FileReader();

            reader.onloadend = () => {
                setFilePrev(reader.result);
            };

            reader.readAsDataURL(file);
        };
        filePreview();
    }, [file]);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div>{error}</div>;

    if (posts.length === 0) {
        return <div>No posts currently available.</div>;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;

    const handleSubmitPost = (e) => {
        e.preventDefault();
        if (!postContent.trim()) return;

        const form = new FormData();

        form.append("content", postContent);
        form.append("postImage", file);

        submitPost(form);
        setPostContent("");
        setFilePrev(null);
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const removeFilePrev = () => {
        setFilePrev(null);
        setSelectedFile(null);
    };

    return (
        <>
            <Nav />
            <div className={styles.postWrapper}>
                {!user?.isGuest && (
                    <form
                        className={styles.createPostWrapper}
                        onSubmit={handleSubmitPost}
                    >
                        <textarea
                            rows={"6"}
                            placeholder="Post something..."
                            name="content"
                            value={postContent}
                            onChange={(e) => setPostContent(e.target.value)}
                            className={styles.textarea}
                        ></textarea>
                        <div className={styles.bottomWrapper}>
                            <button
                                className={styles.postBtn}
                                disabled={postSubmitting}
                            >
                                {postSubmitting ? "Posting..." : "Post"}
                            </button>
                            <input
                                type="file"
                                id="post-image"
                                className={styles.fileUpload}
                                onChange={handleFileChange}
                                accept="image/*"
                            />
                            <label
                                htmlFor="post-image"
                                className={styles.customFileUpload}
                            >
                                <ImageUp className={styles.imgUp} />
                            </label>
                            {filePrev && (
                                <div>
                                    <img
                                        className={styles.imgPrev}
                                        src={filePrev}
                                        alt="Preview"
                                    />
                                    <button
                                        className={styles.closeBtn}
                                        onClick={() => removeFilePrev()}
                                    >
                                        x
                                    </button>
                                </div>
                            )}
                        </div>
                    </form>
                )}

                <div className={styles.postList}>
                    {posts.map((p) => (
                        <div key={p.id} className={styles.postItem}>
                            <div className={styles.post}>
                                <div className={styles.user}>
                                    <img
                                        loading="eager"
                                        className={styles.pfp}
                                        src={p.author?.profilePicture}
                                    />
                                    <div className={styles.left}>
                                        <p>{p.author?.name}</p>
                                        <p className={styles.postDate}>
                                            {new Date(
                                                p.createdAt,
                                            ).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                                hour: "numeric",
                                                minute: "numeric",
                                            })}
                                        </p>
                                    </div>
                                </div>
                                <p>{p.content}</p>
                                {p.postImage && (
                                    <img
                                        loading="eager"
                                        className={styles.postImg}
                                        src={p.postImage}
                                    />
                                )}{" "}
                                <div className={styles.heart}>
                                    {!user?.isGuest && (
                                        <div className={styles.heartInfo}>
                                            <Heart
                                                height={28}
                                                width={28}
                                                className={
                                                    p.likes?.includes(userId)
                                                        ? [
                                                              styles.heartIcon,
                                                              styles.active,
                                                          ].join(" ")
                                                        : styles.heartIcon
                                                }
                                                onClick={() => toggleLike(p.id)}
                                            />
                                            <p>{p.likesCount}</p>
                                        </div>
                                    )}
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
