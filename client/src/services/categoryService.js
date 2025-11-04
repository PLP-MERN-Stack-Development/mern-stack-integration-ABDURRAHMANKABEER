import api from "./api";

const categoryService = {
    getCategories: async () => {
        const res = await api.get("/categories");
        return res.data;
    },

    createCategory: async (data) => {
        const res = await api.post("/categories", data);
        return res.data;
    }
};

export { categoryService };
