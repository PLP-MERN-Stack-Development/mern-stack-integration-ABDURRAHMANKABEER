import api from "./api";
import axios from "axios";

const PostService = {
    //   Get all posts (with pagination + category filter)
    getPosts: async (page = 1, limit = 10, category = null) => {
        let url = `/posts?page=${page}&limit=${limit}`;
        if (category) url += `&category=${category}`;
        const res = await api.get(url);
        return res.data;
    },

    // Get single post by ID or slug
    getPost: async (idOrSlug) => {
        const res = await api.get(`/posts/${idOrSlug}`);
        return res.data;
    },

    // Get post only by ID 
    getPostById: async (id) => {
        const res = await api.get(`/posts/${id}`);
        return res.data;
    },

    // Create post
    createPost: async (data) => {
        const res = await api.post("/posts", data);
        return res.data;
    },

    // Update post
    updatePost: async (id, data) => {
        const res = await api.put(`/posts/${id}`, data);
        return res.data;
    },

    // Delete post
    deletePost: async (id) => {
        const res = await api.delete(`/posts/${id}`);
        return res.data;
    },

    // Add comment
    addComment: async (postId, content) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const res = await api.post(`/posts/${postId}/comments`, {
            userId: user._id,
            content,
        });
        return res.data;
    },

    // Search posts globally
    search: async (query) => {
        const res = await api.get(`/posts/search?q=${query}`);
        return res.data;
    },

    // Get posts by category only
    getPostsByCategory: async (category) => {
        const res = await api.get(`/posts?category=${category}`);
        return res.data;
    },

    // Get posts of logged-in user
    getMyPosts: async () => {
        const token = localStorage.getItem("token");
        const res = await api.get(`/posts/me`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    }
};

export { PostService };