import express from 'express';
import { registerUser } from '../controllers/userController.js'; // ✅ Corrected path

const router = express.Router();

router.post('/register', registerUser);

export default router;
