import express from 'express'
import verifyAdmin from '../lib/auth.js';
import { createUser, getUsers } from '../controller/createUser.js';

const router=express.Router();

router.post('/create/user',createUser);
router.get('/get/user',getUsers);

export default router