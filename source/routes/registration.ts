import express from 'express';
import controller from '../controllers/registration';
import authController from '../controllers/login';
const router = express.Router();

router.get('/list', controller.listAccounts);

router.post('/create', controller.createAccount);

router.post('/authenticate', authController.authenticate);

export = router;
