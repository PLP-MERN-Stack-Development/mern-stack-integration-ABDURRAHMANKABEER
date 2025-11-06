import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PostService } from "../services/postService";
import toast from "react-hot-toast";

export default function CategoryPosts() {
    const { name } = useParams();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const load = async () => {
        try {
            const data = await PostService.getPostsByCategory(name);
            setPosts(data);
        } catch {
            toast.error("No posts found in this category.");
        }
        };
        load();
    }, [name]);

    return (
        <div className="p-6 text-white">
            <h1 className="text-xl font-semibold mb-4">{name} Posts</h1>
            
            {posts.length === 0 ? (
                <p>No posts yet.</p>
            ) : (
                posts.map((p) => (
                <div key={p._id} className="border p-4 mb-2 rounded">
                    <h2 className="font-semibold">{p.title}</h2>
                    <p className="text-sm opacity-70">{p.category?.name}</p>
                </div>
                ))
            )}
        </div>
    );
}
