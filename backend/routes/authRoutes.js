import express from 'express';
import { register, login } from '../controllers/authController.js';
import { updateUserProfileController } from '../controllers/blogController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/users/profile', updateUserProfileController);

export default router;
