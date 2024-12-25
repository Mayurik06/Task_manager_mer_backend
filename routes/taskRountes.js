import express from 'express'
import { createTask } from '../controller/taskController.js';

const router=express.Router();

router.post('/create/task',createTask);

export default router