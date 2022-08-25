import express from 'express';
// import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/product.js';
import { getProducts,getProduct,createProduct,deleteProduct,updateProduct } from '../controllers/product.js';

const router=express.Router();

router.get('/',getProducts);
router.post("/",createProduct);
router.get('/:id',getProduct)
router.delete("/:id",deleteProduct)
router.put('/:id',updateProduct)


export default router;