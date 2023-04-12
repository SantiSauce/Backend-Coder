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
    
    router.get('/', [reqAuth], getCarts)
    router.post('/',createCart)
    router.post('/:cid/product/:pid', [reqAuth], addProductToCart)
    router.delete('/:cid/product/:pid', [reqAuth],deleteProductFromCart) 
    router.put('/:cid/product/:pid', [reqAuth], updateQuantity)
    router.delete('/:cid', [reqAuth],deleteAllProductsFromCart)
    router.post('/:cid', [reqAuth], updateProductsFromCart)
    router.post('/:cid/purchase', [reqAuth], generatePurchase)
        
export default router

