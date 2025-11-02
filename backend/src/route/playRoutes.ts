import { Router } from 'express';
import { recordMatch, viewRecord } from '../controllers/playController';

const router = Router();

router.post('/record', recordMatch);
router.get('/record/:scheduleId', viewRecord);

export default router;