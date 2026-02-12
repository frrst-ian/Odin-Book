import useUserByID from "../../hooks/useUserByID";
import styles from "./user_by_id.module.css";
import Nav from "../Nav/Nav";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

export default function UserById() {
    const { user, loading, error } = useUserByID();
    const navigate = useNavigate();

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div>{error}</div>;

    const navigateToFollowers = (userId) => {
        navigate(`/followers/${userId}`);
    };
    return (
        <>
            <Nav></Nav>
            <div className={styles.userInfoWrapper}>
                {user && (
                    <div className={styles.userInfo}>
                        <img
                            className={styles.pfp}
                            src={user.profilePicture}
                            alt="PFP"
                        />
                        <div className={styles.followInfoBtnWrapper}>
                            <Button
                                label={"Followers"}
                                task={() => navigateToFollowers(user.id)}
                                type={"stripped"}
                            ></Button>
                            <Button
                                label={"Following"}
                                task={() => navigateToFollowers(user.id)}
                                type={"stripped"}
                            ></Button>
                        </div>
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
