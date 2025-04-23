// controllers/userController.js
export const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // You can enhance this with hashing, DB checks, etc.
        // This is a basic placeholder.
        res.status(201).json({ message: "User registered successfully", email });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
