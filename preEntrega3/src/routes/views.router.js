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
    getCartView

} from '../controllers/views.controller.js'

export default class ViewsRouter extends MyRouter{
    init() {
        this.get('/home', ['USER', 'ADMIN'], showHomeView)
        this.get('/allProducts', ['USER', 'ADMIN'],showAllProducts)
        this.get('/insertProduct', ['ADMIN'], getInsertProductView)
        this.get('/products/:id', ['USER'],showOneProduct) 
        this.get('/register', ['PUBLIC'], getRegister)
        this.get('/login', ['PUBLIC'],getLogIn)
        this.get('/admin', ['ADMIN'],showAdminView)
        this.get('/cart/:id', ['USER'],getCartView)
    }
}








