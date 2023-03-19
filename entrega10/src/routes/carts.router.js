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
import { authPolicies } from '../middlewares/auth.js'

const router = Router()
    
    router.post('/',authPolicies('public'),createCart)
    router.get('/', authPolicies('admin'), getCarts)
    router.get('/:cid/product/:pid', authPolicies(['user', 'admin']),addProductToCart)
    router.get('/string/:cid/product/:pid/delete', authPolicies('user'), deleteProductFromCart) 
    router.get('/string/:cid', authPolicies('user'),deleteAllProductsFromCart)
    router.get('/string/:cid', authPolicies('user'),updateProductsFromCart)
    router.get('/:cid/product/:pid/updateQuantity', authPolicies('user'),updateQuantity)
    router.post('/:cid/purchase', authPolicies('user'),generatePurchase)
        
export default router

