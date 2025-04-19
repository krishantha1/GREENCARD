import express from 'express';
import authUser from '../middlewares/AuthUser.js';
import { getAllOrders, getUserOrders, placeOrderCOD } from '../controllers/orderController.js';
import authSeller from '../middlewares/AuthSeller.js';



const orderRouter = express.Router();

orderRouter.post('/cod', authUser, placeOrderCOD)
orderRouter.get('/user', authUser, getUserOrders)
orderRouter.get('/cod', authSeller, getAllOrders)



export  default orderRouter;