import {Router} from "express";
import {confirm, lostPwd, newPwd, authenticate, checkToken, register, profile} from "../controllers/userController";
import checkAuth from '../middleware/middleware';

const router = Router();

// autentification, register and confirmation of users
router.post('/', register);
router.post('/login', authenticate);
router.get('/confirm/:token', confirm);
router.post('/lost-password', lostPwd);
router.get('/lost-password/:token', checkToken);
router.post('/lost-password/:token', newPwd);

router.get('/profile', checkAuth, profile);

export default router;