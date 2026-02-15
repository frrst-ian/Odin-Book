import useFollowing from "../../hooks/useFollowing";
import Nav from "../Nav/Nav";
import styles from "./following.module.css";

export default function Followers() {
    const { userFollowing, error, loading } = useFollowing();

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <>
            <Nav />
            <div className={styles.followingWrapper}>
                <div className={styles.userList}>
                    {userFollowing.map((u) => (
                        <div key={u.id} className={styles.userItem}>
                            <div className={styles.user}>
                                <img
                                    decoding="async"
                                    loading="eager"
                                    className={styles.pfp}
                                    src={u.profilePicture}
                                />
                                <p>{u.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {error && <div> {error} </div>}
            </div>
        </>
    );
}
