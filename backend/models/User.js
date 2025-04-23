import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the user schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Pre-save middleware to hash the password before storing it in the database
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Only hash if password is modified
    this.password = await bcrypt.hash(this.password, 12); // Hash with salt rounds of 12
    next();
});

// Method to compare entered password with stored hashed password
userSchema.methods.comparePassword = function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

// Create the User model
const User = mongoose.model('User', userSchema);

export default User;
