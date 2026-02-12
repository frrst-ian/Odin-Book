import { useState } from "react";
import useRegister from "../../hooks/useRegister";
import styles from "./register.module.css";
import Button from "../Button/Button";

const Register = () => {
    const { registerUser, error, submitting } = useRegister();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [file, setSelectedFile] = useState(null);
    const [bio, setBio] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = new FormData();

        form.append("name", name);
        form.append("email", email);
        form.append("password", password);
        form.append("confirmPassword", confirmPassword);
        form.append("profilePicture", file);
        form.append("bio", bio);

        registerUser(form);
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleOAuthLogin = (provider) => {
        const baseUrl = "http://localhost:3000/api";
        window.location.href = `${baseUrl}/auth/${provider}`;
    };

    return (
        <>
            <div className={styles.registerContainer}>
                <div className={styles.registerFormContainer}>
                    <form
                        className={styles.registerForm}
                        onSubmit={handleSubmit}
                    >
                        <h2 className={styles.registerHeader}>
                            Create an account
                        </h2>

                        {error && (
                            <div className={styles.error}>
                                {error.map((err, index) => (
                                    <span key={index}>{err}</span>
                                ))}
                            </div>
                        )}
                        <input
                            className={styles.registerInput}
                            type="Full name"
                            title="Full name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            autoComplete="name"
                            placeholder="Name"
                            required
                        />
                        <input
                            className={styles.registerInput}
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
                            className={styles.registerInput}
                            type="password"
                            title="Password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            placeholder="Password"
                            required
                        />
                        <input
                            className={styles.registerInput}
                            type="password"
                            title="Confirm password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            autoComplete="current-password"
                            placeholder="Confirm password"
                            required
                        />
                        <label id={styles.file}>
                            Upload your profile picture (max: 5mb):
                        </label>
                        <input
                            id="file"
                            type="file"
                            onChange={handleFileChange}
                            required
                        />
                        <input
                            className={styles.registerInput}
                            type="text"
                            name="bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Bio"
                            required
                        />

                        <Button
                            type="primary"
                            label={submitting ? "Submitting..." : "Register"}
                            status={submitting}
                        ></Button>
                    </form>
                    <div className={styles.oauthLogin}>
                        <button
                            className={styles.btnOAuth}
                            onClick={() => handleOAuthLogin("github")}
                        >
                            Continue with Github
                        </button>

                        <a
                            className={styles.btn}
                            rel="noopener noreferrer"
                            href="/login"
                        >
                            Already have an account? Login
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
};

export default Register;
