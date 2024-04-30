import {Router} from "express";
import {getAllChats, getChat, getSummary} from "../controllers/articleController";
import checkAuth from "../middleware/middleware";

const router = Router();

router.post('/', getSummary);
router.get('/', checkAuth, getAllChats);
router.get('/:id', checkAuth, getChat);

export default router;