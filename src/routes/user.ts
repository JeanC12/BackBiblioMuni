import { Router } from "express";
import { deleteUser,getUser,getUsers,postUser,updateUser } from "../controllers/user";
import { deleteBook } from "../controllers/book";

const router = Router();

router.get('/',getUsers);
router.get('/:id',getUser);
router.get('/:id',deleteBook);
router.post('/',postUser);
router.post('/:id',updateUser);

export default router;