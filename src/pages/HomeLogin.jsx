import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomeLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", {
                email,
                password
            });

            const { token, user } = response.data;

            if (token && user) {
                localStorage.setItem("authToken", token);
                localStorage.setItem("user", JSON.stringify(user));
                toast.success("Login successful!");
                navigate("/Home");
            }
        } catch (err) {
            setError("Invalid email or password! Please try again.");
            toast.error("Invalid email or password! Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-600">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Sign In</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
                        <input 
                            type="email" 
                            className="w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2 text-gray-700">Password</label>
                        <input 
                            type="password" 
                            className="w-full p-3 rounded-md bg-gray-100 text-gray-800 border border-gray-300" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Sign In"}
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-700">
                    Don't have an account? <a href="/signup" className="text-blue-500">Sign Up</a>
                </p>
            </div>
        </div>
    );
};

export default HomeLogin;
