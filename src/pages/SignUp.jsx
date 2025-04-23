import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/api/auth/signup", {
                email,
                password,
            });

            const { token, user } = response.data;

            localStorage.setItem("authToken", token);
            localStorage.setItem("user", JSON.stringify(user));
            toast.success("Sign up successful!");
            navigate("/login");
        } catch (error) {
            setErrorMessage(error.response.data.message || "Error signing up.");
            toast.error(error.response.data.message || "Error signing up.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-600 to-teal-600">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Sign Up</h2>
                {errorMessage && (
                    <p className="text-red-500 text-center mb-4">{errorMessage}</p>
                )}
                <form onSubmit={handleSignUp}>
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
                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-700">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-500">Log In</a>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
