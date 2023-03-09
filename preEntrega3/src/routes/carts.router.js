import MyRouter from './router.js'
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


export default class CartsRouter extends MyRouter{
    init(){
        this.post('/',createCart)
        this.get('/', getCarts)
        this.get('/:cid/product/:pid', ['USER'],addProductToCart)
        this.get('/string/:cid/product/:pid/delete', ['USER'], deleteProductFromCart) 
        this.get('/string/:cid', ['USER'],deleteAllProductsFromCart)
        this.get('/string/:cid', ['USER'],updateProductsFromCart)
        this.get('/string/:cid/product/:pid/update', ['USER'],updateQuantity)
        this.post('/:cid/purchase', ['USER'],generatePurchase)
    //this.get('/string/:cid', getCartById)
        
    }
}
