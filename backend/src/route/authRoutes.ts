import { Router } from 'express';
import { admin, login, logout, register, session } from '../controllers/authController';

const router = Router();

router.post('/signup', register);
router.post('/login', login);
router.get('/session', session);
router.post('/logout', logout);
router.post('/admin', admin);

export default router;