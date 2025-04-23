import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['books', 'clothes'],
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    imageUrl: {
        type: String,
        default: ''
    },
    donorName: {
        type: String,
        required: true,
    },
    teamId: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Donation', donationSchema);
