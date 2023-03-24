import express from 'express';
import controller from '../controllers/sample';
import cojController from '../controllers/cojController';
const router = express.Router();

router.get('/ping', controller.serverHealthCheck);
router.get('/twitter', controller.twitter);
router.post('/coj/scheduleByBlockId', cojController.getScheduleByBlockId);
export = router;
