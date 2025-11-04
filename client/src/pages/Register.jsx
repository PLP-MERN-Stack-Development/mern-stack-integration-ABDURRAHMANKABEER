import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { authService } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
        const { token, user } = await authService.register(form);
        localStorage.setItem("token", token);
        setUser(user);
        toast.success("Registration successful!");
        navigate("/");
        } catch (err) {
        toast.error(err?.response?.data?.message || "Registration failed");
        } finally {
        setLoading(false);
        }
    };

    return (
        <section className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Full Name</label>
                    <input
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Email</label>
                    <input
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Password</label>
                    <input
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
                    type="password"
                    required
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                </div>

                <button
                    disabled={loading}
                    className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:bg-green-300"
                >
                    {loading ? "Creating Account..." : "Register"}
                </button>
                </form>

                <p className="text-sm text-center mt-4">
                    Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:underline">
                    Login
                </Link>
                </p>
            </div>
        </section>
    );
}
