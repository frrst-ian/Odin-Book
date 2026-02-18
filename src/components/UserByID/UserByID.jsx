import useUserByID from "../../hooks/useUserByID";
import styles from "./user_by_id.module.css";
import Nav from "../Nav/Nav";
import { useNavigate } from "react-router-dom";
import useFollow from "../../hooks/useFollow";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { MoveLeft } from "lucide-react";

export default function UserById() {
    const { user } = useContext(UserContext);

    const { userItem, loading, error } = useUserByID();
    const navigate = useNavigate();
    const { toggleFollow, userFollowing } = useFollow();

    const isFollowing = (userId) => {
        return userFollowing.some((userItem) => userItem.id === userId);
    };

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
                {userItem && (
                    <div className={styles.userInfo}>
                        <div className={styles.top}>
                            <button
                                className={styles.backBtn}
                                onClick={() => navigate("/users")}
                            >
                                <MoveLeft color="#8b5cf6" />
                            </button>
                        </div>
                        <div className={styles.center}>
                            <div className="imgWrapper">
                                <img
                                    className={styles.pfp}
                                    src={userItem.profilePicture}
                                    alt="PFP"
                                />
                            </div>
                            <div className={styles.left}>
                                <h4 className={styles.name}>{userItem.name}</h4>
                                <div className={styles.followInfoBtnWrapper}>
                                    <div
                                        onClick={() =>
                                            navigateToFollowers(userItem.id)
                                        }
                                        className={styles.followBtnWrapper}
                                    >
                                        <p className={styles.count}>
                                            {userItem._count.followedBy}
                                        </p>
                                        <button
                                            className={styles.followInfoBtn}
                                        >
                                            followers
                                        </button>
                                    </div>

                                    <div
                                        onClick={() =>
                                            navigateToFollowing(userItem.id)
                                        }
                                        className={styles.followBtnWrapper}
                                    >
                                        <p className={styles.count}>
                                            {userItem._count.following}
                                        </p>
                                        <button
                                            className={styles.followInfoBtn}
                                        >
                                            following
                                        </button>
                                    </div>
                                </div>
                                <div className={styles.bio}>{userItem.bio}</div>
                            </div>
                        </div>
                        {user.id !== userItem.id && (
                            <div className={styles.bottom}>
                                <button
                                    className={
                                        isFollowing(userItem.id)
                                            ? styles.followingBtn
                                            : styles.followBtn
                                    }
                                    onClick={() => toggleFollow(userItem.id)}
                                >
                                    {isFollowing(userItem.id)
                                        ? "Following"
                                        : "Follow"}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}
