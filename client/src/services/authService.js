import api from "./api";

const authService = {
    register: async (data) => {
        const res = await api.post("/auth/register", data);
        return res.data;
    },

    login: async (data) => {
        const res = await api.post("/auth/login", data);
        if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        }
        return res.data;
    },

    getMe: async () => {
        const res = await api.get("/auth/me");
        return res.data;
    },

    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    },

    getCurrentUser: () => {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    }
};

export { authService };
