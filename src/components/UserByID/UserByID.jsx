import useUserByID from "../../hooks/useUserByID";
import styles from "./user_by_id.module.css";
// import Nav from '../Nav/Nav'

export default function UserById() {
    const { user, loading, error } = useUserByID();

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div>{error}</div>;
    return (
        <>
            {/*<Nav></Nav>*/}
            <div className={styles.userInfoWrapper}>
                {user && (
                    <div className={styles.userInfo}>
                        <img
                            className={styles.pfp}
                            src={user.profilePicture}
                            alt="User's PFP"
                        />
                        <h3 className={styles.name}>{user.name}</h3>
                        <div className={styles.bio}>
                            {user.bio}
                            <p>Bio</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
