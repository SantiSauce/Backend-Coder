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
        this.get('/:cid', getCartById)
        this.get('/:cid/product/:pid', ['USER'],addProductToCart)
        this.get('/:cid/product/:pid/delete', deleteProductFromCart) 
        this.get('/:cid', deleteAllProductsFromCart)
        this.get('/:cid', updateProductsFromCart)
        this.get('/:cid/product/:pid/update', ['USER'],updateQuantity)
        this.post('/:cid/purchase', ['USER'],generatePurchase)
        
    }
}
