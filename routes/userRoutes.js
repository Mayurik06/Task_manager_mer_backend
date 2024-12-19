import express from 'express'
import verifyAdmin from '../lib/auth.js';
import { createUser, deleteUsers, getUsers } from '../controller/createUser.js';

const router=express.Router();

router.post('/create/user',createUser);
router.get('/get/user',getUsers);
router.delete('/delete/user/:id',deleteUsers);

export default router
