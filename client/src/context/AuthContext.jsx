import React, { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(authService.getCurrentUser());
    const [loading, setLoading] = useState(false);

    const login = async (credentials) => {
        setLoading(true);
        const data = await authService.login(credentials);
        setUser(data.user);
        setLoading(false);
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, loading, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
};

// Custom hook to access AuthContext
export const useAuth = () => useContext(AuthContext);