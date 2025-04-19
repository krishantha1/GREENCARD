import express from "express";
import authUser from "../middlewares/AuthUser.js";
import { updateCart } from "../controllers/cartController.js";

const cartRouter = express.Router(); // ✅ Correct

cartRouter.post('/update', authUser, updateCart);

export default cartRouter;
