import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [users, setUsers] = useState(JSON.parse(localStorage.getItem("users")) || []);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignUp = (e) => {
        e.preventDefault();

        // Check if user already exists
        if (users.some((user) => user.email === email)) {
            alert("User already exists! Try logging in.");
            return;
        }

        // Add user to array and save in localStorage
        const newUser = { email, password };
        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers));

        alert("Sign up successful! You can now log in.");
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
                <form onSubmit={handleSignUp}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input 
                            type="email" 
                            className="w-full p-3 rounded bg-gray-700 text-white" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Password</label>
                        <input 
                            type="password" 
                            className="w-full p-3 rounded bg-gray-700 text-white" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg">
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Already have an account? <a href="/login" className="text-blue-400">Log In</a>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
