import useFollowers from "../../hooks/useFollowers";
import Nav from "../Nav/Nav";
import styles from "./followers.module.css";

export default function Followers() {
    const { userFollowers, error, loading } = useFollowers();

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div>{error}</div>;

    console.log("User followers:", userFollowers);

    if(userFollowers.length === 0) {
        return <div>No followers</div>
    }


    return (
        <>
            <Nav />
            <div className={styles.followersWrapper}>
                <div className={styles.userList}>
                    {userFollowers.map((u) => (
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
            </div>
        </>
    );
}
