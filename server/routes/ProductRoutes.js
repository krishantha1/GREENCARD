import express from 'express';
import { upload } from '../configs/multer.js';
import authSeller from '../middlewares/AuthSeller.js';
import { addProduct, changeStock, productByIdt, productList } from '../controllers/ProductController.js';






const productRouter = express.Router();

productRouter.post('/add', upload.array('images'), authSeller,addProduct);

productRouter.get('/list',productList)

productRouter.get('/id',productByIdt)

productRouter.post('/stock',authSeller,changeStock)


export default productRouter;
