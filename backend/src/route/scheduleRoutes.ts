import { Router } from 'express';
import { createSchedule, getSchedules } from '../controllers/scheduleController';
import admin from '@/middleware/admin';

const router = Router();

router.post('/new', admin, createSchedule);
router.get('/allMatches', getSchedules);

export default router;