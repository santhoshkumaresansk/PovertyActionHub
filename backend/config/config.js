const config = {
    mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/povertyhub',  // Default URI for local MongoDB if no Atlas URI exists
    jwtSecret: process.env.JWT_SECRET || 'your_default_jwt_secret',
};

export default config;
