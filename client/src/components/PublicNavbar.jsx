import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authService } from "../services/authService";
import toast from "react-hot-toast";

export default function Navbar({ title = "MyBlog" }) {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const activeClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold dark:text-yellow-300"
      : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-yellow-300";

  return (
    <nav className="bg-white dark:bg-gray-900 shadow px-4 py-3 flex justify-between items-center fixed top-0 left-0 w-full z-50">
      {/* Logo / Title */}
      <Link to="/" className="font-bold text-xl dark:text-white">
        {title}
      </Link>

      {/* Right Section with reserved space for hamburger */}
      <div className="flex items-center gap-2 sm:gap-4 pr-12">
        
        {/* Dark mode button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 dark:text-white"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        {/* BEFORE LOGIN */}
        {!user && (
          <>
            <NavLink to="/" className={activeClass}>
              Home
            </NavLink>
            <NavLink to="/categories" className={activeClass}>
              Categories
            </NavLink>
            <NavLink to="/login" className={activeClass}>
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="bg-blue-600 text-white px-3 py-1.5 text-sm sm:px-4 sm:py-2 rounded hover:bg-blue-700"
            >
              Register
            </NavLink>
          </>
        )}

        {/* AFTER LOGIN */}
        {user && (
          <>
            <span className="font-medium text-gray-800 dark:text-gray-200 text-sm sm:text-base">
              Hi, {user.name}
            </span>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600 text-sm sm:text-base"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
