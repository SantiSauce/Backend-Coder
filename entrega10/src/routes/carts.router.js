import { Router } from 'express'
import {
    getCarts,
    getCartById,
    createCart,
    addProductToCart,
    deleteProductFromCart,
    deleteAllProductsFromCart,
    updateProductsFromCart,
    updateQuantity,
    generatePurchase
} from '../controllers/carts.controller.js'
import { reqAuth } from '../middlewares/auth.js'

const router = Router()
    
    router.post('/',createCart)
    router.get('/', [reqAuth], getCarts)
    router.get('/:cid/product/:pid', [reqAuth], addProductToCart)
    router.get('/string/:cid/product/:pid/delete', [reqAuth],deleteProductFromCart) 
    router.get('/string/:cid', [reqAuth],deleteAllProductsFromCart)
    router.get('/string/:cid', [reqAuth], updateProductsFromCart)
    router.get('/:cid/product/:pid/updateQuantity', [reqAuth], updateQuantity)
    router.post('/:cid/purchase', [reqAuth], generatePurchase)
        
export default router

