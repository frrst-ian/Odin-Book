import { useState, useContext } from "react";
import styles from "./nav.module.css";
import useOutsideClick from "../../hooks/useOutsideClick";
import {
    UsersRound,
    LogOut,
    CircleUser,
    LayoutDashboard,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function Nav() {
    const [open, setOpen] = useState(false);
    const { user, logout } = useContext(UserContext);
    const navigate = useNavigate();

    const handleClickOutside = () => setOpen(false);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const ref = useOutsideClick(handleClickOutside);

    return (
        <div className={styles.navWrapper}>
            <nav>
                {!user?.isGuest && (
                    <div className={styles.navGroup}>
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? [styles.navItem, styles.active].join(" ")
                                    : styles.navItem
                            }
                            to="/posts"
                        >
                            <LayoutDashboard className={styles.navIcon} />
                            Feed
                        </NavLink>
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? [styles.navItem, styles.active].join(" ")
                                    : styles.navItem
                            }
                            to="/users"
                        >
                            <UsersRound className={styles.navIcon} />
                            People
                        </NavLink>
                    </div>
                )}

                <div className={styles.dropdown}>
                    <button
                        className={styles.pfpBtn}
                        ref={ref}
                        type="button"
                        onClick={() => setOpen(!open)}
                    >
                        <img
                            src={user?.profilePicture}
                            alt="pfp"
                            className={styles.pfp}
                        />
                    </button>

                    {open && (
                        <ul className={styles.menu}>
                            {!user?.isGuest && (
                                <li
                                    className={styles.menuItem}
                                    onClick={() =>
                                        navigate(`/users/${user?.id}`)
                                    }
                                >
                                    <CircleUser className={styles.icon} />
                                    <p>View profile</p>
                                </li>
                            )}

                            {user?.isGuest && (
                                <li
                                    className={styles.menuItem}
                                    onClick={() => navigate("/register")}
                                >
                                    <CircleUser className={styles.icon} />
                                    <p>Create an account</p>
                                </li>
                            )}

                            <li
                                className={styles.menuItem}
                                onClick={handleLogout}
                            >
                                <LogOut className={styles.icon} />
                                <p>
                                    {user?.isGuest
                                        ? "Exit guest mode"
                                        : "Log out"}
                                </p>
                            </li>
                        </ul>
                    )}
                </div>
            </nav>

            {user?.isGuest && (
                <div className={styles.guestBanner}>
                    Browsing as guest —
                    <span
                        className={styles.guestBannerLink}
                        onClick={() => navigate("/register")}
                    >
                        Create an account to post and interact
                    </span>
                </div>
            )}
        </div>
    );
}
