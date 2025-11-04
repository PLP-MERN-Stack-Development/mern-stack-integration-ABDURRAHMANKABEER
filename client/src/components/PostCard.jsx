import { Link } from "react-router-dom";

export default function PostCard({ post }) {
    return (
        <section className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition border border-gray-100">
            <Link to={`/posts/${ post._id || post.slug }`}>
                <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600">
                {post.title}
                </h2>
            </Link>

            <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                {post.excerpt || post.content?.substring(0, 120) + "..."}
            </p>

            <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
                {post.category?.name || "Uncategorized"}
                </span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
        </section>
    );
}
