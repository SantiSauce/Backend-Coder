import { Router } from "express";
import {
    createProduct,
    getProducts,
    getProductById,
    deleteProduct,
    updateProduct 
} from '../controllers/products.controller.js'
import { authPolicies } from "../middlewares/auth.js";
import asyncHandler from 'express-async-handler'

const router = Router()

    router.get('/', authPolicies('user'), getProducts) 
    router.post('/create', authPolicies('admin'),asyncHandler(createProduct))
    router.put('/:id', authPolicies('admin'),updateProduct)
    router.delete('/:id', authPolicies('admin'),deleteProduct)
    router.get('/:id', authPolicies('user'), getProductById)
    

export default router
    
