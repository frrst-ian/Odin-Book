import { useState } from "react";
import useRegister from "../../hooks/useRegister";
import styles from "./register.module.css";
import Button from "../Button/Button";
import { Navigate } from "react-router-dom";

const Register = () => {
    const { registerUser, error, submitting } = useRegister();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        registerUser(name, email, password, confirmPassword);
    };

    return (
        <>
            <div className={styles.registerContainer}>
                <form onSubmit={handleSubmit}>
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

                    <Button
                        type="primary"
                        label={submitting ? "Submitting..." : "Register"}
                        status={submitting}
                    ></Button>
                </form>
            </div>
        </>
    );
};

export default Register;
