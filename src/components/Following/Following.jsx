import useFollowing from "../../hooks/useFollowing";
import Nav from "../Nav/Nav";
import styles from "./following.module.css";
import { CircleUser, MoveLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function Followers() {
    const navigate = useNavigate();
    const { id } = useParams();

    const { userFollowing, error, loading } = useFollowing();

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <>
            <Nav />
            <div className={styles.followingWrapper}>
                <div className={styles.userList}>
                    <div className={styles.top}>
                        <button
                            className={styles.backBtn}
                            onClick={() => navigate(`/users/${id}`)}
                        >
                            <MoveLeft color="#8b5cf6" /> Back
                        </button>
                    </div>
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
