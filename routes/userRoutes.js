import express from 'express'
import verifyAdmin from '../lib/auth.js';
import { createUser } from '../controller/createUser.js';

const router=express.Router();

router.post('/create/user',createUser);

export default router