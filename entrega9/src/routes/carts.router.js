import { Router } from 'express'
import {
    getCarts,
    getCartById,
    createCart,
    addProductToCart,
    deleteProductFromCart,
    deleteAllProductsFromCart,
    updateProductsFromCart,
    updateStock,
} from '../controllers/carts.controller.js'

const router = Router()

//api routes
router.post('/', createCart)

router.get('/', getCarts)

router.get('/:cid', getCartById)

router.get('/:cid/product/:pid', addProductToCart)

router.get('/:cid/product/:pid', deleteProductFromCart)

router.get('/:cid', deleteAllProductsFromCart)

router.get('/:cid', updateProductsFromCart)

router.get('/:cid/product/:pid', updateStock)

export {router as cartsRouter}