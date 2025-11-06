import React, { useEffect, useState } from "react";
import { PostService } from "../services/postService";
import PostCard from "../components/PostCard";

const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
        const data = await PostService.getPosts();
        setPosts(data);
        };
        fetchPosts();
    }, []);

    return (
        <section className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6 text-white">Latest Posts</h1>

            {posts.length === 0 ? (
                <p>No posts yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <PostCard key={post._id} post={post} />
                ))}
                </div>
            )}
        </section>
    );
};

export default Home;