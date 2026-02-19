import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

const UserContext = createContext();

const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

const isTokenExpired = (token) => {
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.exp * 1000 < Date.now();
    } catch {
        return true;
    }
};

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = useCallback((tokenData, userData) => {
        setUser(userData);
        setToken(tokenData);
        localStorage.setItem("token", tokenData);
        localStorage.setItem("user", JSON.stringify(userData));
    }, []);

    const logout = useCallback(() => {
        setUser((currentUser) => {
            if (currentUser?.id) {
                localStorage.removeItem(`activeSession_${currentUser.id}`);
            }
            return null;
        });
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }, []);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");

        if (storedToken && isTokenExpired(storedToken)) {
            logout();
            setLoading(false);
            return;
        }

        if (storedToken) {
            const storedUser = localStorage.getItem("user");
            try {
                setUser(JSON.parse(storedUser));
                setToken(storedToken);
            } catch {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            }
        }

        setLoading(false);
    }, [logout]);

    const setTokenAndFetchProfile = useCallback(async (token) => {
        const profileResponse = await client.get("/u/profile", {
            headers: { Authorization: `Bearer ${token}` },
        });
        
        login(token, profileResponse.data);
    }, [login]);

    const handleOAuthCallback = useCallback(async (token) => {
        try {
            await setTokenAndFetchProfile(token);
        } catch (error) {
            console.error("OAuth callback error:", error);
            alert("Login failed. Please try again.");
        }
    }, [setTokenAndFetchProfile]);

    const loginAsGuest = useCallback(async () => {
        try {
            const response = await client.post("/auth/guest");
            const { token, user } = response.data;
            login(token, user);
            return true;
        } catch (err) {
            console.error("Guest login failed:", err);
            return false;
        }
    }, [login]);

    return (
        <UserContext.Provider
            value={{ user, token, login, logout, loading, handleOAuthCallback, loginAsGuest }}
        >
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };