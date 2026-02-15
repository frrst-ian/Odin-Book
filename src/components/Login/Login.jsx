import { useState } from "react";
import useLogin from "../../hooks/useLogin";
import Button from "../Button/Button";
import styles from "./login.module.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { loginUser, error, submitting } = useLogin();

    const handleSubmit = (e) => {
        e.preventDefault();

        loginUser(email, password);
    };

    const handleOAuthLogin = (provider) => {
        const baseUrl = "http://localhost:3000/api";
        window.location.href = `${baseUrl}/auth/${provider}`;
    };

    

    return (
        <>
            <div className={styles.loginContainer}>
                <div className={styles.loginFormContainer}>
                    <form className={styles.loginForm} onSubmit={handleSubmit}>
                        <h2 className={styles.loginHeader}> Login to Odinbook</h2>
                        {error && <span className={styles.error}>{error}</span>}
                        <input
                            className={styles.loginInput}
                            type="email"
                            title="Email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            placeholder="Email"
                            required
                        />
                    
                        <input
                            className={styles.loginInput}
                            type="password"
                            title="Password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            placeholder="Password"
                            required
                        />
                    
                        <Button
                            type="primary"
                            label={submitting ? "Logging in..." : "Login"}
                            status={submitting}
                        ></Button>
                    
                        <span>or</span>
                    </form>
                    <div className={styles.oauthLogin} >
                        <button
                            className={styles.btnOAuth}
                            onClick={() => handleOAuthLogin("github")}
                        >
                            Continue with Github
                        </button>
                        
                        <a
                            className={styles.btn}
                            rel="noopener noreferrer"
                            href="/register"
                        >
                            Don't have an account? Register
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                fill="none"
                                viewBox="0 0 16 16"
                                className="icon page_arrowRight__4KrB_"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M9.75 4.75 13.25 8m0 0-3.5 3.25M13.25 8H2.75"
                                ></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
