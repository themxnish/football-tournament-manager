import { Router } from 'express';
import { login, logout, register, session } from '../controllers/authController';

const router = Router();

router.post('/signup', register);
router.post('/login', login);
router.get('/session', session);
router.post('/logout', logout)

export default router;