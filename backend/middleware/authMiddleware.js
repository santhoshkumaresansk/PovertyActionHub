import jwt from 'jsonwebtoken';

// Middleware to check if the user is authenticated
export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Authorization header missing or invalid" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;  // Attach userId to the request object for later use
        next();  // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("JWT verification error:", error);
        res.status(401).json({ error: "Invalid or expired token" });
    }
};
