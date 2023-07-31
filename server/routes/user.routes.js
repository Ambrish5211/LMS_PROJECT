import express from 'express';
const router = express.Router();
import upload from '../middlewares/multer.middleware.js';

import { register, login, logout, getProfile, resetPassword, forgotPassword } from '../controllers/user.controller.js';
import { isLoggedIn } from '../middlewares/auth.middleware.js';


router.post('/register', upload.single('avatar'), register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me',isLoggedIn, getProfile);
router.post('/reset', forgotPassword);
router.post('/reset/:resetToken', resetPassword);

export default router;