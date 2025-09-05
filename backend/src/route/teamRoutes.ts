import { create, remove, teams } from '@/controllers/teamController';
import { Router } from 'express';
import admin from '@/middleware/admin';

const router = Router();

router.post('/new', admin,  create);
router.get('/teams', teams);
router.delete('/remove', admin,  remove);

export default router;