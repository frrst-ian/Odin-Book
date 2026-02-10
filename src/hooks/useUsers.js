import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const client = axios.create({
    baseURL: "http://localhost:3000/api",
});

export default function useUsers() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUser = useCallback(async () => {
        try {
            const query = `?searchQuery=${search}`;
            const token = localStorage.getItem("token");
            const response = await client.get(`/u${query}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const usersData = await response.data;
            setUsers(usersData);
            if (usersData.length === 0) {
                setError("User does not exist");
            } else {
                setError(null);
            }
        } catch (err) {
            console.error(err.response.data);
            setError(err.response.data);
        } finally {
            setLoading(false);
        }
    }, [search]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!search.trim()) return;
        fetchUser(search);
    };

    return {
        handleSearch,
        users,
        search,
        setSearch,
        loading,
        error,
    };
}
