import express from 'express';
import { getJournalists, getJournalist } from '../controllers/journalistController.js';

const router = express.Router();

router.get('/', getJournalists);
router.get('/:id', getJournalist);

export default router;
