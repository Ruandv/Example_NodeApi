import express from 'express';
import auth from '../controllers/auth';
const router = express.Router();
router.post('/', auth.googleAuth);
router.get('/callback', auth.callback);
export = router;
