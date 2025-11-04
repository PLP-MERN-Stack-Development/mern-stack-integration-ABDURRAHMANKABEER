import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children, roles = [] }) {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return (
        <div className="flex h-screen items-center justify-center text-lg font-semibold">
            Loading...
        </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // If roles are passed, check user role
    if (roles.length > 0 && !roles.includes(user.role)) {
        return (
        <div className="flex h-screen items-center justify-center text-center p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-md">
            <h2 className="text-xl font-bold text-red-600 mb-2">Unauthorized</h2>
            <p className="text-gray-600">You do not have permission to view this page.</p>
            </div>
        </div>
        );
    }

    return children;
}
