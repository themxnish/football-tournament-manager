import { Router } from 'express';
import { recordMatch } from '../controllers/playController';

const router = Router();

router.post('/record', recordMatch);

export default router;