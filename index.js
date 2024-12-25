import express from 'express'
import { config } from 'dotenv';
import dbConnection from './connection/dbConnection.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRoutes.js';
import taskRouter from './routes/taskRountes.js'
import auth from './routes/auth/auth.js'

config({path:"./.env"})
const app=express();
const port=process.env.PORT
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cookieParser());

app.use(cors({
    origin:process.env.FRONTEND_URL,
    methods:['GET','PUT','PATCH','DELETE'],
    credentials:true
}))
app.options('*',cors());
app.use('/api',userRouter);
app.use('/api',taskRouter);
app.use('/api',auth)

dbConnection();


try{
    app.listen(process.env.PORT || 4000, () => {
        console.log(`Server running on http://localhost:${port}`);
      });
}catch(err){
    console.log(err)
}