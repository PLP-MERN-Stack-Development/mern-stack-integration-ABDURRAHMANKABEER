import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authService } from "../services/authService";
import toast from "react-hot-toast";

export default function Navbar() {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        authService.logout();
        setUser(null);
        toast.success("Logged out successfully!");
        navigate("/login");
    };

    const activeClass = ({ isActive }) =>
        isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600";

    return (
        <nav className="bg-white shadow p-4 flex justify-between items-center">
            <Link to="/" className="font-bold text-xl">MyBlog</Link>

            <div className="flex items-center ps-1 gap-4">
                <NavLink to="/" className={activeClass}>Home</NavLink>
                <NavLink to="/categories" className={activeClass}>Categories</NavLink>

                {/* Show create-post link only to authors and admins */}
                {user && (user.role === "author" || user.role === "admin") && (
                    <NavLink to="/create-post" className={activeClass}>Create Post</NavLink>
                )}
                
                {/* Show create-post link only to authors only */}
                {user && user.role === "author" && (
                    <NavLink to="/my-posts" className="hover:text-blue-600">My Posts</NavLink>
                )}

                {/* Dashboard visible to admin */}
                {user && user.role === "admin" && (
                    <NavLink to="/dashboard" className={activeClass}>Dashboard</NavLink>
                )}

                {/* Auth links */}
                {!user ? (
                    <>
                        <NavLink to="/login" className={activeClass}>Login</NavLink>
                        <NavLink to="/register" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Register</NavLink>
                    </>
                    ) : (
                    <>
                        <span className="font-medium text-gray-800">Hi, {user.name}</span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}
