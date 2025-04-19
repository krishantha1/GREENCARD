import express  from 'express';
import authUser from '../middlewares/AuthUser.js';
import {isAuth, login, logout, register } from '../controllers/UserController.js';



const userRouter = express.Router();

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.get('/is-auth', authUser, isAuth)
userRouter.get('/logout',authUser, logout)




export default userRouter;