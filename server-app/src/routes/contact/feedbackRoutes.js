import express from 'express';
import { handleFeedback } from  '../../controllers/contact/feedbackController.js';

const router = express.Router();

router.post('/feedback', handleFeedback);

export default router;
