import { Link } from "react-router-dom";

const categories = [
    "Technology",
    "AI",
    "Education",
    "Health",
    "Business",
    "Lifestyle",
];

export default function Categories() {
    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Categories</h2>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {categories.map((cat) => (
                <Link
                    key={cat}
                    to={`/category/${cat}`}
                    className="bg-gray-200 hover:bg-gray-300 p-3 rounded text-center font-medium"
                >
                    {cat}
                </Link>
                ))}
            </div>
        </div>
    );
}
