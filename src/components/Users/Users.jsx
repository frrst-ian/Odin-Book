import { useNavigate } from "react-router-dom";
import useUsers from "../../hooks/useUsers";
import useFollow from "../../hooks/useFollow";
import styles from "./users.module.css";
import Nav from "../Nav/Nav";
import { Search, History, CircleUser } from "lucide-react";
import Button from "../Button/Button";

export default function Users() {
    const { handleSearch, search, setSearch, users, loading, error } =
        useUsers();

    const { toggleFollow, userFollowing } = useFollow();

    const isFollowing = (userId) => {
        return userFollowing.some((user) => user.id === userId);
    };

    const navigate = useNavigate();

    if (loading) return <div className="loading">Loading...</div>;

    const isUserFollowing = (userId) => {
        const currentUser = JSON.parse(localStorage.getItem("user"));
        const currentUserId = currentUser.id;
        return userId[0] === currentUserId ? true : false;
    };

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
                    <History color="#dedede" width="20px" />
                    <p>Recent users</p>
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
                                        type={"secondary"}
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
