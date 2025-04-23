import express from 'express';
import { addDonation, getDonations } from '../controllers/donationController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/donations', authMiddleware, addDonation);  // Protected route
router.get('/donations', getDonations);  // Public route

export default router;
