import { useNavigate } from "react-router-dom";
import { Search, CircleUser } from "lucide-react";
import Button from "../Button/Button";
import Nav from "../Nav/Nav";
import useUsers from "../../hooks/useUsers";
import useFollow from "../../hooks/useFollow";
import styles from "./users.module.css";

export default function Users() {
    const { handleSearch, search, setSearch, users, loading, error } =
        useUsers();

    const { toggleFollow, userFollowing } = useFollow();

    const isFollowing = (userId) => {
        return userFollowing.some((user) => user.id === userId);
    };

    const navigate = useNavigate();

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <>
            <Nav />
            <div className={styles.usersWrapper}>
                <div className={styles.searchWrapper}>
                    <form className={styles.form} onSubmit={handleSearch}>
                        <Search className={styles.searchIcon} />
                        <input
                            className={styles.searchInput}
                            name="search"
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search"
                        />
                    </form>
                </div>
                <div className={styles.recent}>
                    <p>Suggested</p>
                </div>

                <div className={styles.usersList}>
                    {users.map((u) => (
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
                                <div className={styles.actionBtn}>
                                    <Button
                                        label={
                                            isFollowing(u.id)
                                                ? "Following"
                                                : "Follow"
                                        }
                                        type={
                                            isFollowing(u.id)
                                                ? "secondaryVar2"
                                                : "secondary"
                                        }
                                        task={() => toggleFollow(u.id)}
                                    ></Button>
                                </div>
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
