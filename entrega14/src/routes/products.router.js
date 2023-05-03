import { Router } from "express";
import {
    createProduct,
    getProducts,
    getProductById,
    deleteProduct,
    updateProduct 
} from '../controllers/products.controller.js'
import asyncHandler from 'express-async-handler'
import { reqAdmin } from "../middlewares/auth.js";
import { reqAuth } from "../middlewares/auth.js";
import { reqPremium } from "../middlewares/auth.js";

const router = Router()

    router.get('/', [reqAuth], getProducts) 
    router.post('/create', [reqPremium, reqAdmin, reqAuth], createProduct)
    router.put('/:id', [reqAdmin, reqAuth], updateProduct)
    router.delete('/:id', [reqPremium, reqAdmin, reqAuth], deleteProduct)
    router.get('/:id', [reqAuth], getProductById)
    

export default router
    
