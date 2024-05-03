import {Router} from "express";
import {archiveChat, deleteChat, getAllChats, getChat, getSummary, nextMessage} from "../controllers/articleController";
import checkAuth from "../middleware/middleware";

const router = Router();

router.post('/', getSummary);
router.get('/', checkAuth, getAllChats);

router.get('/:id', checkAuth, getChat);
router.patch('/:id', checkAuth, nextMessage);
router.put('/:id', checkAuth, archiveChat);
router.delete('/:id', checkAuth, deleteChat);

export default router;