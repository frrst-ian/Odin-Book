import { createContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

const client = axios.create({
    baseURL: "http://localhost:3000/api",
});

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    const isTokenExpired = (token) => {
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            return payload.exp * 1000 < Date.now();
        } catch {
            return true;
        }
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (token && isTokenExpired(token)) logout();
        const storedUser = localStorage.getItem("user");
        if (storedToken) {
            try {
                setUser(JSON.parse(storedUser));
                setToken(storedToken);
            } catch (err) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            }
        }
        setLoading(false);
    }, []);

    const setTokenAndFetchProfile = async (token) => {
        setToken(token);
        localStorage.setItem("token", token);

        const profileResponse = await client.get("/u/profile", {
            headers: { Authorization: `Bearer ${token}` },
        });
        setUser(profileResponse.data);
        login(token, profileResponse.data);
    };

    const login = (tokenData, userData) => {
        setUser(userData);
        setToken(tokenData);
        localStorage.setItem("token", tokenData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        if (user?.id) {
            localStorage.removeItem(`activeSession_${user.id}`);
        }

        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    const handleOAuthCallback = async (token) => {
        try {
            await setTokenAndFetchProfile(token);
        } catch (error) {
            console.error("OAuth callback error:", error);
            alert("Login failed. Please try again.");
        }
    };

    const loginAsGuest = async () => {
        try {
            const response = await client.post("/auth/guest");
            const { token, user } = response.data;
            login(token, user);
            return true;
        } catch (err) {
            console.error("Guest login failed:", err);
            return false;
        }
    };

    return (
        <UserContext.Provider
            value={{ user, token, login, logout, loading, handleOAuthCallback,loginAsGuest }}
        >
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
