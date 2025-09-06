import { Router } from 'express';
import { createSchedule, getSchedules, remove } from '../controllers/scheduleController';
import admin from '@/middleware/admin';

const router = Router();

router.post('/new', admin, createSchedule);
router.get('/allMatches', getSchedules);
router.delete('/:id', admin, remove);

export default router;