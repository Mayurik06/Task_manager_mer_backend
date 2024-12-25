import express from 'express'
import verifyAdmin from '../lib/auth.js';
import { createUser, deleteUsers, getUserById, getUsers, updateUser } from '../controller/createUser.js';

const router=express.Router();

router.post('/create/user',createUser);
router.get('/get/user',getUsers);
router.delete('/delete/user/:id',deleteUsers);
router.get('/get/userById/:id',getUserById);
router.put('/update/user/:id',updateUser);

export default router
