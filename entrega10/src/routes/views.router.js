import MyRouter from "./router.js"
import { passportCall } from "../utils/utils.js" 
import {
    showAllProducts,
    showOneProduct, 
    getInsertProductView,
    showHomeView,
    getRegister,
    getLogIn,
    showAdminView,
    getCartView,
    showPurchasesView

} from '../controllers/views.controller.js'

export default class ViewsRouter extends MyRouter{
    init() {
        this.get('/home', ['USER', 'ADMIN'], showHomeView)
        this.get('/allProducts', ['USER', 'ADMIN'],showAllProducts)
        this.get('/insertProduct', ['ADMIN'], getInsertProductView)
        this.get('/register', ['PUBLIC'], getRegister)
        this.get('/login', ['PUBLIC'],getLogIn)
        this.get('/admin', ['ADMIN'],showAdminView)
        this.get('/cart/:cid', ['USER'],getCartView)
        this.get('/products/:pid', ['USER'],showOneProduct) 
        this.get('/purchases', ['USER'],showPurchasesView) 

    }
}








