import { create, teams } from '@/controllers/teamController';
import { Router } from 'express';

const router = Router();

router.post('/new', create);
router.get('/teams', teams);

export default router;