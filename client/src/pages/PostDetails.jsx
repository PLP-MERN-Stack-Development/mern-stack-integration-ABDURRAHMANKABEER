// src/pages/PostDetails.jsx
import React, { useEffect, useState } from "react";
import { PostService } from "../services/postService";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PostDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();

    const [post, setPost] = useState(null);
    const [comment, setComment] = useState("");

    const fetchPost = async () => {
        const res = await PostService.getPostById(id);
        setPost(res);
    };

    useEffect(() => {
        fetchPost();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await PostService.addComment(id, comment);
        setComment("");
        fetchPost();
    };

    if (!post) return <p>Loading...</p>;

    return (
        <section className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <p className="mb-6">{post.content}</p>

            <h2 className="text-xl font-semibold mb-3">Comments</h2>
            <div className="space-y-3 mb-6">
                {post.comments?.map((c) => (
                <div key={c._id} className="border p-2 rounded">
                    <strong>{c.user?.name}</strong>
                    <p>{c.content}</p>
                </div>
                ))}
            </div>

            {user && (
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        className="border p-2 w-full"
                        placeholder="Write a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button className="bg-blue-600 text-white px-4">Send</button>
                </form>
            )}
        </section>
    );
};

export default PostDetails;
