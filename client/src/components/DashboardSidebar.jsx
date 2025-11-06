import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { X } from "lucide-react";

export default function Sidebar({ isOpen, onClose }) {
    const { user } = useAuth();

    // Role-based links
    const links = [
        { to: "/", label: "Home", roles: ["admin", "author", "user"] },
        { to: "/dashboard", label: "Dashboard", roles: ["admin"] },
        { to: "/create-post", label: "Create Post", roles: ["admin", "author"] },
        { to: "/my-posts", label: "My Posts", roles: ["author", "admin"] },
        { to: "/categories", label: "Categories", roles: ["admin", "author", "user"] },
    ];

    const activeClass = ({ isActive }) =>
        isActive
        ? "text-blue-600 font-semibold"
        : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-yellow-300";

    return (
        <>
            {/* BACKDROP (mobile only) */}
            {isOpen && (
                <div
                className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
                onClick={onClose}
                ></div>
            )}

            {/* SIDEBAR */}
            <aside
                className={`fixed top-16 right-0 z-50 w-64 h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 shadow-lg border-l p-4 transform transition-transform duration-200
                ${isOpen ? "translate-x-0" : "translate-x-full"}
                lg:translate-x-0 lg:static lg:border-none lg:h-screen`}
            >
                {/* Close button (mobile only) */}
                <button
                className="lg:hidden text-gray-600 dark:text-gray-200 mb-4"
                onClick={onClose}
                >
                <X size={26} />
                </button>

                <nav className="flex flex-col gap-3">
                {links
                    .filter((link) => link.roles.includes(user?.role))
                    .map((link) => (
                    <NavLink key={link.to} to={link.to} className={activeClass}>
                        {link.label}
                    </NavLink>
                    ))}
                </nav>
            </aside>
        </>
    );
}
