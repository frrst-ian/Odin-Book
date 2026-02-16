import useFollowers from "../../hooks/useFollowers";
import Nav from "../Nav/Nav";
import styles from "./followers.module.css";
import { CircleUser } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Followers() {
    const { userFollowers, error, loading } = useFollowers();
    const navigate = useNavigate();

    if (loading) return <div className="loading">Loading...</div>;

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
                            <div className={styles.actionBtnsWrapper}>
                                <div
                                    className={[
                                        styles.actionBtn,
                                        styles.actionBtnIcon,
                                    ].join(" ")}
                                    onClick={() => navigate(`/users/${u.id}`)}
                                >
                                    <CircleUser />
                                    <span className={styles.tooltip}>
                                        View profile
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {error && <div> {error} </div>}
            </div>
        </>
    );
}
