import express from 'express'
import { login, logout } from '../../controller/auth/login.js';
import { setPassword } from '../../controller/auth/setPassword.js';
import { checkPassword } from '../../controller/auth/checkPassword.js';



const router=express.Router();

router.post('/login',login);
router.put('/setPassword/:id',setPassword);
router.post('/check-password/:id',checkPassword);
router.post('/logout',logout);

export default router