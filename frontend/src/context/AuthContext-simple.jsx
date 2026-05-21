import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

const API_BASE = "http://localhost:5000/api";

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem("token") || "");
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const setSession = (newToken, newUser) => {
        setToken(newToken);
        localStorage.setItem("token", newToken);
        setUser(newUser);
    };

    const clearSession = () => {
        setToken("");
        localStorage.removeItem("token");
        setUser(null);
    };

    const fetchMe = async (activeToken) => {
        const t = activeToken || token;
        if (!t) {
            setUser(null);
            return;
        }

        const { data } = await axios.get(`${API_BASE}/auth/me`, {
            headers: { Authorization: `Bearer ${t}` },
        });

        setUser(data.user);
    };

    useEffect(() => {
        (async () => {
            try {
                await fetchMe(token);
            } catch (e) {
                clearSession();
            } finally {
                setLoading(false);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const login = async (email, password) => {
        const { data } = await axios.post(`${API_BASE}/auth/login`, { email, password });
        setSession(data.token, data.user);
        return data;
    };

    const register = async (name, email, password) => {
        const { data } = await axios.post(`${API_BASE}/auth/register`, { name, email, password });
        setSession(data.token, data.user);
        return data;
    };

    const logout = () => {
        clearSession();
    };

    const value = useMemo(
        () => ({ token, user, loading, login, register, logout, refreshMe: fetchMe }),
        [token, user, loading]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return ctx;
};
