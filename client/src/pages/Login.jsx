import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { authService } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
        const { token, user } = await authService.login(form);
        localStorage.setItem("token", token);
        setUser(user);
        toast.success("Logged in successfully!");
        navigate("/");
        } catch (err) {
        toast.error("Login failed!");
        } finally {
        setLoading(false);
        }
    };

    return (
        <section className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block mb-1 font-medium">Email</label>
                    <input
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Password</label>
                    <input
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
                    type="password"
                    required
                    value={form.password}
                    onChange={(e) => setForm({...form, password: e.target.value})}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-blue-300"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
                </form>

                <p className="text-sm text-center mt-4">
                    Don't have an account?{" "}
                <Link to="/register" className="text-blue-600 hover:underline">
                    Register
                </Link>
                </p>
            </div>
        </section>
    );
}
