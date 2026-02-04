import { useEffect, useState } from "react";
import { getAuthHeaders } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const client = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: { ...getAuthHeaders() },
});

export default function useUsers() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const query = `?searchQuery=${search}`;
            const response = await client.get(`/u${query}`)
           
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
    };

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
