import useUserByID from "../../hooks/useUserByID";
import styles from "./user_by_id.module.css";
import Nav from "../Nav/Nav";
import { useNavigate } from "react-router-dom";

export default function UserById() {
    const { user, loading, error } = useUserByID();
    const navigate = useNavigate();

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div>{error}</div>;

    const navigateToFollowers = (userId) => {
        navigate(`/followers/${userId}`);
    };

    const navigateToFollowing = (userId) => {
        navigate(`/following/${userId}`);
    };

    return (
        <>
            <Nav></Nav>
            <div className={styles.userInfoWrapper}>
                {user && (
                    <div className={styles.userInfo}>
                        <div className={styles.top}>
                            <div className="imgWrapper">
                                <img
                                    className={styles.pfp}
                                    src={user.profilePicture}
                                    alt="PFP"
                                />
                            </div>
                            <div className={styles.left}>
                                <h4 className={styles.name}>{user.name}</h4>
                                <div className={styles.followInfoBtnWrapper}>
                                    <div
                                        onClick={() => navigateToFollowers(user.id)}
                                        className={styles.followBtnWrapper}
                                    >
                                        <p className={styles.count}>
                                            {user._count.followedBy}
                                        </p>
                                        <button className={styles.followInfoBtn}>
                                            followers
                                        </button>
                                    </div>
                            
                                       <div
                                        onClick={() => navigateToFollowing(user.id)}
                                        className={styles.followBtnWrapper}
                                    >
                                        <p className={styles.count}>
                                            {user._count.following}
                                        </p>
                                        <button className={styles.followInfoBtn}>
                                            following
                                        </button>
                                    </div>
                            
                            
                                </div>
                                <div className={styles.bio}>{user.bio}</div>
                            </div>
                        </div>
                        <div className={styles.bottom} >
                            <button> Follow </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
