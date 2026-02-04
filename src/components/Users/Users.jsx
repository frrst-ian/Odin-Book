import { useNavigate } from "react-router-dom";
import useUsers from "../../hooks/useUsers";
import styles from "./users.module.css";
// import Nav from "../Nav/Nav";
import { Search, History, CircleUser } from "lucide-react";

export default function Users() {
    const {
        handleSearch,
        search,
        setSearch,
        users,
        loading,
        error,
        handleUserClick,
    } = useUsers();

    const navigate = useNavigate();

    console.log("Users:" , users)

    if (loading) return <div className="loading" >Loading...</div>;

    return (
        <>
            {/*<Nav />*/}
            <div className={styles.usersWrapper}>
                <div className={styles.searchWrapper}>
                    <form className={styles.form} onSubmit={handleSearch}>
                        <Search className={styles.searchIcon} color="#bfbfbf" />
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
                    <History color="#dedede" />
                    <p>Recent users...</p>
                </div>

                <div className={styles.usersList}>
                    {users.map((u) => (
                        <div key={u.id} className={styles.userItem}>
                            <div className={styles.user}>
                                <img className={styles.pfp} src={u.profilePicture} />
                                <p>{u.name}</p>
                            </div>
                            <div className={styles.actionBtnsWrapper}>
                                <div
                                    className={styles.actionBtn}
                                    onClick={() => navigate(`/users/${u.id}`)}
                                >
                                    <CircleUser />
                                    <span className={styles.tooltip}>
                                        View profile
                                    </span>
                                </div>
                                <div
                                    className={styles.actionBtn}
                                    onClick={() => handleUserClick(u.id)}
                                >
                                  
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
